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

const CORS_CONFIG = {
  credentials: true,
};

module.exports = {
  LIMITER_CONFIG,
  MONGO_CONFIG,
  CORS_CONFIG,
};
