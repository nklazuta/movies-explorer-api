const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');

const {
  NOT_FOUND_ERR,
  BAD_REQUEST_ERR,
  FORBIDDEN_ERR,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { ...rest } = req.body;

  Movie.create({ owner: req.user._id, ...rest })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new Error('NotFound'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError(FORBIDDEN_ERR);
      } else {
        return movie.remove()
          .then(() => res.send({ data: movie }));
      }
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError(NOT_FOUND_ERR));
      } if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERR));
      } else {
        next(err);
      }
    });
};
