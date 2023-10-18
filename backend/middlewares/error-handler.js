const errorHandler = (err, req, res, next) => {
  //если у ошибки нет статуса, выставляем 500
  console.log("Ошибка");
  console.log(err.statusCode);
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере22 произошла ошибка" : message,
  });
};

module.exports = errorHandler;
