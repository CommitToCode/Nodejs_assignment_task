const mongoose = require('mongoose');
const Booking = require('../models/booking');
const Movie = require('../models/movie');
const Theater = require('../models/theater');
const { sendBookingSummary } = require('../emailsetup/email');

exports.moviesWithTotalBookings = async (req, res, next) => {
  try {
    const agg = await Booking.aggregate([
      { $match: { status: 'Booked' } },
      { $group: { _id: '$movie', totalTickets: { $sum: '$tickets' } } },
      { $lookup: { from: 'movies', localField: '_id', foreignField: '_id', as: 'movie' } },
      { $unwind: '$movie' },
      { $project: { _id: 0, movieId: '$movie._id', movieName: '$movie.name', totalTickets: 1 } },
      { $sort: { totalTickets: -1 } }
    ]);
    res.json(agg);
  } catch (e) { next(e); }
};

exports.bookingsByTheater = async (req, res, next) => {
  try {
    const agg = await Booking.aggregate([
      { $match: { status: 'Booked' } },
      {
        $group: {
          _id: { theater: '$theater', showId: '$showId', movie: '$movie', showTime: '$showTime' },
          totalTickets: { $sum: '$tickets' }
        }
      },
      { $lookup: { from: 'theaters', localField: '_id.theater', foreignField: '_id', as: 'theater' } },
      { $unwind: '$theater' },
      { $lookup: { from: 'movies', localField: '_id.movie', foreignField: '_id', as: 'movie' } },
      { $unwind: '$movie' },
      {
        $project: {
          _id: 0,
          theaterId: '$_id.theater',
          theaterName: '$theater.name',
          movieName: '$movie.name',
          showId: '$_id.showId',
          showTime: '$_id.showTime',
          totalTickets: 1
        }
      },
      { $sort: { theaterName: 1, showTime: 1 } }
    ]);
    res.json(agg);
  } catch (e) { next(e); }
};

exports.emailMyBookingSummary = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('movie', 'name')
      .populate('theater', 'name location');

    const rows = bookings.map(b => `
      <tr>
        <td>${b._id}</td>
        <td>${b.movie?.name || ''}</td>
        <td>${b.theater?.name || ''}</td>
        <td>${b.theater?.location || ''}</td>
        <td>${b.screenNumber}</td>
        <td>${new Date(b.showTime).toLocaleString()}</td>
        <td>${b.tickets}</td>
        <td>${b.status}</td>
      </tr>
    `).join('');

    const htmlTable = `
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <thead>
          <tr>
            <th>Booking ID</th><th>Movie</th><th>Theater</th><th>Location</th>
            <th>Screen</th><th>Show Time</th><th>Tickets</th><th>Status</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    await sendBookingSummary({ to: req.user.email, htmlTable });
    res.json({ message: 'Summary sent to your email' });
  } catch (e) { next(e); }
};
