require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { PORT, MONGO_URL } = require('./utils/env-config');

const {
  MONGO_CONFIG,
  LIMITER_CONFIG,
  CORS_CONFIG,
} = require('./utils/configs');

const app = express();
mongoose.connect(MONGO_URL, MONGO_CONFIG);

const limiter = rateLimit(LIMITER_CONFIG);
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use(cors(CORS_CONFIG));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
