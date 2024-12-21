const { supabaseUser, supabaseAdmin } = require("../db/supabase-connection");

exports.loginUser = ({ email, password }) => {
  return supabaseUser.auth
    .signInWithPassword({
      email: email,
      password: password,
    })
    .then(({ data, error }) => {
      if (error) {
        return Promise.reject({
          status: error.status,
          msg: "Invalid credentials",
        });
      }
      return data;
    });
};

exports.registerUser = ({
  email,
  password,
  username,
  first_name,
  last_name,
}) => {
  return supabaseUser.auth
    .signUp({
      email: email,
      email_confirm: true,
      password: password,
      options: {
        data: {
          email: email,
          username: username,
          first_name: first_name,
          last_name: last_name,
          role: "user",
        },
      },
    })
    .then(({ data, error }) => {
      if (error) {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      return data;
    });
};

exports.logoutUser = (JWT) => {
  return supabaseUser.auth.signOut({ JWT }).then(({ data, error }) => {
    if (error) {
      return Promise.reject({ status: error.status, msg: error.code });
    }
  });
};
