const { createClient } = require("@supabase/supabase-js");

require("dotenv").config({
  path: `${__dirname}/../.env.supabase`,
});

const supabaseUser = createClient(
  process.env.SUPABASE_URL,
  process.env.ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  }
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

module.exports = { supabaseUser, supabaseAdmin };
