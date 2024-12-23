const { supabaseUser } = require("../db/supabase-connection");

exports.authoriseUser = (request, response) => {
  const { accessToken } = request.cookies;
  const refresh_token = request.cookies.refreshToken;

  if (!refresh_token) {
    return Promise.reject({
      status: 401,
      msg: "Refresh token missing or expired",
    });
  }

  return supabaseUser.auth.getUser(accessToken).then(({ data, error }) => {
    if (error) {
      return supabaseUser.auth
        .refreshSession({ refresh_token })
        .then(({ data, error }) => {
          if (error) {
            return Promise.reject({
              status: error.status,
              msg: "Unauthorised user",
            });
          }
          const newAccessToken = data.session.access_token;
          const newRefreshToken = data.session.refresh_token;
          response.cookie("accessToken", newAccessToken, {
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 1000, // Set the expiration time (1 hour in this example)
          });
          response.cookie("refreshToken", newRefreshToken, {
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // Set the expiration time (7 days in this example)
          });
          return data;
        });
    }
    return data;
  });
};
