const supabaseUser = require("../db/supabase-connection");

exports.signInUser = ({ email, password }) => {
  return supabaseUser.auth
    .signInWithPassword({
      email: email,
      password: password,
    })
    .then(({ data }) => {
      return data;
    });
};
