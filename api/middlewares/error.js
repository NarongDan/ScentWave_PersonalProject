const errorMiddleware = (err, req, res, next) => {
  console.log(err);

  // ถ้า error มาจาก jsonwebtoken // หรือ token หมดอายุ
  //   if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
  //     err.statusCode = 401;
  //   }

  // จัดการ error ทั่วไป
  res
    .status(err.statusCode || 500)
    .json({ message: err.message, field: err.field });
};

module.exports = errorMiddleware;
