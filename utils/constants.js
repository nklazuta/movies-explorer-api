const SERVER_ERR = 'На сервере произошла ошибка';
const NOT_FOUND_PAGE_ERR = 'Запрашиваемый ресурс не найден';
const NOT_FOUND_ERR = 'Пользователь с указанным id не найден';
const BAD_REQUEST_ERR = 'Переданы некорректные данные';
const EMAIL_ALREADY_EXIST_ERR = 'Такой пользователь уже существует';
const UNAUTHORIZED_ERR = 'Необходима авторизация';
const FORBIDDEN_ERR = 'Нельзя удалять карточки фильмов других пользователей';
const LOGIN_ERR = 'Неправильные почта или пароль';
const LOGOUT_MESSAGE = 'user logged out';

module.exports = {
  SERVER_ERR,
  NOT_FOUND_PAGE_ERR,
  NOT_FOUND_ERR,
  BAD_REQUEST_ERR,
  EMAIL_ALREADY_EXIST_ERR,
  UNAUTHORIZED_ERR,
  FORBIDDEN_ERR,
  LOGIN_ERR,
  LOGOUT_MESSAGE,
};
