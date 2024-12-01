const { supabaseUser, supabaseAdmin } = require("../db/supabase-connection");

exports.loginUser = ({ email, password }) => {
  return supabaseUser.auth
    .signInWithPassword({
      email: email,
      password: password,
    })
    .then(({ data, error }) => {
      if (error) {
        return Promise.reject({ status: error.status, msg: error.code });
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
  return supabaseAdmin.auth.admin
    .createUser({
      email: email,
      email_confirm: true,
      password: password,
      user_metadata: {
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        role: "user",
      },
    })
    .then(({ data, error }) => {
      if (error) {
        return Promise.reject({ status: error.status, msg: error.code });
      }
      return data;
    });
};
