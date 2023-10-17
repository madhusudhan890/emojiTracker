const JWT = require("jsonwebtoken");
const { use } = require("../routes/routes");

exports.createToken = async (data) => {
  try {
    const { userCode, email } = data;
    const token = JWT.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          userCode: userCode,
          email: email,
        },
      },
      process.env.SECRET
    );
    return token;
  } catch (error) {
    throw error;
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return {
        statusCode: 400,
        message: "unauthorized",
      };
    var decoded = JWT.verify(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET
    );
    req.payload = decoded.data;
    next();
  } catch (error) {
    throw error;
  }
};

exports.urlToken = async (startDate, endDate, userCode) => {
  try {
    const token = JWT.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          startDate: startDate,
          endDate: endDate,
          userCode: userCode,
        },
      },
      process.env.SECRET
    );
    return token;
  } catch (error) {
    throw error;
  }
};

exports.urlVerifyToken = async (req, res, next) => {
  try {
    if (!req.query.token)
      return {
        statusCode: 400,
        message: "Unauthorized",
      };
    var decoded = JWT.verify(req.query.token, process.env.SECRET);
    req.payload = decoded.data;
    next();
  } catch (error) {
    throw error;
  }
};
