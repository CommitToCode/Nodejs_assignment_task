const Theater = require('../models/theater');
const Movie = require('../models/movie');

exports.addTheater = async (req, res, next) => {
  try {
    const { name, location, numberOfScreens } = req.body;
    const theater = await Theater.create({ name, location, numberOfScreens, screens: [] });
    res.status(201).json(theater);
  } catch (e) { next(e); }
};


exports.assignMovie = async (req, res, next) => {
  try {
    const { theaterId } = req.params;
    const { screenNumber, movieId, showTimings = [], seatCapacity, price = 0 } = req.body;

    const theater = await Theater.findById(theaterId);
    if (!theater) return res.status(404).json({ message: 'Theater not found' });

    const movieExists = await Movie.findById(movieId);
    if (!movieExists) return res.status(404).json({ message: 'Movie not found' });

    let screen = theater.screens.find(s => s.screenNumber === +screenNumber);
    if (!screen) {
      screen = { screenNumber: +screenNumber, seatCapacity: seatCapacity || 100, shows: [] };
      theater.screens.push(screen);
    } else if (seatCapacity) {
      screen.seatCapacity = seatCapacity;
    }

    const capacity = screen.seatCapacity;
    for (const t of showTimings) {
      const dt = new Date(t);
      const already = screen.shows.find(sh => sh.movie.toString() === movieId && +new Date(sh.startTime) === +dt);
      if (!already) {
        screen.shows.push({
          movie: movieId,
          startTime: dt,
          availableSeats: capacity,
          price
        });
      }
    }

    await theater.save();
    res.json(theater);
  } catch (e) { next(e); }
};
