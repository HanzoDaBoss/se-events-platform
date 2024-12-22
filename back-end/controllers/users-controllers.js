const {
  loginUser,
  registerUser,
  logoutUser,
} = require("../models/users-models");

exports.postLogin = (request, response, next) => {
  const { body } = request;
  loginUser(body)
    .then((user) => {
      const accessToken = user.session.access_token;
      const refreshToken = user.session.refresh_token;
      const user_data = user.user.user_metadata;
      response.cookie("accessToken", accessToken, {
        secure: false,
        httpOnly: true,
        sameSite: "none",
        maxAge: 60 * 60 * 1000, // Set the expiration time (1 hour)
      });
      response.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set the expiration time (7 days)
      });
      response.status(201).send({ user_data });
    })
    .catch(next);
};

exports.postRegister = (request, response, next) => {
  const { body } = request;
  registerUser(body)
    .then((user) => {
      response.status(201).send(user.user.user_metadata);
    })
    .catch(next);
};

exports.deleteLogout = (request, response, next) => {
  const { accessToken } = request.cookies;
  logoutUser(accessToken)
    .then(() => {
      response.clearCookie("accessToken");
      response.clearCookie("refreshToken");
      response.status(204).send();
    })
    .catch(next);
};
