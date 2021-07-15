const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb',
  SALT_ROUNDS = 10,
  JWT_SECRET_DEV = 'dev-secret',
} = process.env;

module.exports = {
  PORT,
  MONGO_URL,
  SALT_ROUNDS,
  JWT_SECRET_DEV,
};
