const LIMITER_CONFIG = {
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 1000, // можно совершить максимум 100 запросов с одного IP
};

const MONGO_CONFIG = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const allowedCors = [
  'https://diplom.nlazuta.nomoredomains.monster',
  'http://diplom.nlazuta.nomoredomains.monster',
  'localhost:3000',
];

const CORS_CONFIG = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (allowedCors.indexOf(origin) !== -1 || !origin) {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = {
  LIMITER_CONFIG,
  MONGO_CONFIG,
  CORS_CONFIG,
};
