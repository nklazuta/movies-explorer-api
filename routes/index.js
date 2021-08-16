const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { createUserValidation, loginValidation } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_PAGE_ERR } = require('../utils/constants');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/users', usersRoutes);
router.use('/movies', moviesRoutes);

router.get('/signout', logout);

router.use('*', (req, res, next) => next(new NotFoundError(NOT_FOUND_PAGE_ERR)));

module.exports = router;
