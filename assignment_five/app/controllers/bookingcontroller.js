const mongoose = require('mongoose');
const Theater = require('../models/theater');
const Booking = require('../models/booking');
const Movie = require('../models/movie');

/** 1) List of Theaters for a Movie */
exports.getTheatersForMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const pipeline = [
      { $match: { } },
      { $unwind: '$screens' },
      { $unwind: '$screens.shows' },
      { $match: { 'screens.shows.movie': new mongoose.Types.ObjectId(movieId) } },
      {
        $group: {
          _id: '$_id',
          theaterName: { $first: '$name' },
          location: { $first: '$location' },
          shows: {
            $push: {
              showId: '$screens.shows._id',
              screenNumber: '$screens.screenNumber',
              startTime: '$screens.shows.startTime',
              availableSeats: '$screens.shows.availableSeats'
            }
          }
        }
      }
    ];
    const theaters = await Theater.aggregate(pipeline);
    res.json(theaters);
  } catch (e) { next(e); }
};

exports.bookTickets = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { movieId, theaterId, screenNumber, showTime, tickets } = req.body;
    const t = await Theater.findById(theaterId).session(session);
    if (!t) throw new Error('Theater not found');

    const screen = t.screens.find(s => s.screenNumber === +screenNumber);
    if (!screen) throw new Error('Screen not found');

    const parsedTime = new Date(showTime);
    const show = screen.shows.find(sh =>
      sh.movie.toString() === movieId && (+new Date(sh.startTime) === +parsedTime));
    if (!show) throw new Error('Show not found for given time');

    if (show.availableSeats < tickets) throw new Error('Not enough seats');

    
    const upd = await Theater.updateOne(
      { _id: theaterId, 'screens.screenNumber': +screenNumber, 'screens.shows._id': show._id, 'screens.shows.availableSeats': { $gte: tickets } },
      { $inc: { 'screens.$[s].shows.$[sh].availableSeats': -tickets } },
      {
        arrayFilters: [
          { 's.screenNumber': +screenNumber },
          { 'sh._id': show._id }
        ],
        session
      }
    );
    if (upd.modifiedCount !== 1) throw new Error('Seat update failed');

    const booking = await Booking.create([{
      user: req.user.id,
      movie: movieId,
      theater: theaterId,
      screenNumber: +screenNumber,
      showId: show._id,
      showTime: parsedTime,
      tickets: +tickets,
      status: 'Booked'
    }], { session });

    await session.commitTransaction();
    session.endSession();

    const populated = await Booking.findById(booking[0]._id)
      .populate('movie', 'name')
      .populate('theater', 'name location');
    res.status(201).json(populated);
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    next(e);
  }
};


exports.cancelBooking = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const booking = await Booking.findById(req.params.id).session(session);
    if (!booking) throw new Error('Booking not found');
    if (booking.user.toString() !== req.user.id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (booking.status === 'Cancelled') {
      await session.commitTransaction(); session.endSession();
      return res.json({ message: 'Already cancelled' });
    }

    const upd = await Theater.updateOne(
      { _id: booking.theater, 'screens.screenNumber': booking.screenNumber, 'screens.shows._id': booking.showId },
      { $inc: { 'screens.$[s].shows.$[sh].availableSeats': booking.tickets } },
      {
        arrayFilters: [
          { 's.screenNumber': booking.screenNumber },
          { 'sh._id': booking.showId }
        ],
        session
      }
    );
    if (upd.modifiedCount !== 1) throw new Error('Seat rollback failed');

    booking.status = 'Cancelled';
    await booking.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.json({ message: 'Booking cancelled' });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    next(e);
  }
};


exports.myBookings = async (req, res, next) => {
  try {
    const list = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('movie', 'name')
      .populate('theater', 'name location');
    res.json(list);
  } catch (e) { next(e); }
};
