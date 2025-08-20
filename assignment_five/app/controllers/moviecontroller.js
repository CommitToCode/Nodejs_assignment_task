const Movie = require('../models/movie');
const Theater = require('../models/theater');
const mongoose = require('mongoose');

exports.addMovie = async (req, res, next) => {
  try {
    const { name, genre, language, duration, cast, director, releaseDate } = req.body;
    const movie = await Movie.create({
      name,
      genre: Array.isArray(genre) ? genre : (genre ? [genre] : []),
      language,
      duration,
      cast: Array.isArray(cast) ? cast : (cast ? [cast] : []),
      director,
      releaseDate
    });
    res.status(201).json(movie);
  } catch (e) { next(e); }
};

exports.editMovie = async (req, res, next) => {
  try {
    const update = req.body;
    if (update.genre && !Array.isArray(update.genre)) update.genre = [update.genre];
    if (update.cast && !Array.isArray(update.cast)) update.cast = [update.cast];
    const movie = await Movie.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (e) { next(e); }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (e) { next(e); }
};

/**
 * List movies with:
 *  - total number of theaters playing that movie
 *  - theaters & show timings
 */
exports.listMovies = async (req, res, next) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: 'theaters',
          let: { movieId: '$_id' },
          pipeline: [
            { $unwind: '$screens' },
            { $unwind: '$screens.shows' },
            { $match: { $expr: { $eq: ['$screens.shows.movie', '$$movieId'] } } },
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
          ],
          as: 'theaterPlays'
        }
      },
      {
        $addFields: {
          totalTheaters: { $size: '$theaterPlays' }
        }
      }
    ];
    const movies = await Movie.aggregate(pipeline);
    res.json(movies);
  } catch (e) { next(e); }
};
