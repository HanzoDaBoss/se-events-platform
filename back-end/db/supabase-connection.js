const { createClient } = require("@supabase/supabase-js");

require("dotenv").config({
  path: `${__dirname}/../.env.supabase`,
});

const supabaseUser = createClient(
  process.env.SUPABASE_URL,
  process.env.ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false,
    },
  }
);

module.exports = supabaseUser;
