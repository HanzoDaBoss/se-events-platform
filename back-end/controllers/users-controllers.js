const { loginUser, registerUser } = require("../models/users-models");

exports.postLogin = (request, response, next) => {
  const { body } = request;
  loginUser(body)
    .then((user) => {
      const accessToken = user.session.access_token;
      const refreshToken = user.session.refresh_token;
      const user_id = user.user.id;
      const user_data = user.user.user_metadata;
      response.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // Set the expiration time (1 hour)
      });
      response.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Set the expiration time (7 days)
      });
      response.status(201).send({ user_id, ...user_data });
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
