const format = require("pg-format");
const db = require("../connection");
const { createClient } = require("@supabase/supabase-js");

require("dotenv").config({
  path: `${__dirname}/../../.env.supabase`,
});

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

const seed = ({ eventsData, usersData }) => {
  return db
    .query(`DROP TRIGGER IF EXISTS on_new_user ON auth.users;`)
    .then(() => {
      `DROP FUNCTION IF EXISTS public.handle_new_user;`;
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users_events;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return supabaseAdmin.auth.admin.listUsers();
    })
    .then(({ data }) => {
      const user_ids = data.users.map((user) => user.id);

      const deleteUsersPromises = user_ids.map((user_id) => {
        return supabaseAdmin.auth.admin.deleteUser(user_id);
      });
      return Promise.all(deleteUsersPromises);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY REFERENCES auth.users ON delete cascade,
        email VARCHAR NOT NULL UNIQUE,
        username VARCHAR NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        role VARCHAR NOT NULL
      );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        returns trigger as $$
        BEGIN
          INSERT INTO public.users (id, email, username, first_name, last_name, role)
          VALUES (new.id, new.raw_user_meta_data ->> 'email', new.raw_user_meta_data ->> 'username', new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name', new.raw_user_meta_data ->> 'role');
          RETURN NEW;
        END;
        $$ language plpgsql security definer;
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TRIGGER on_new_user
        AFTER INSERT ON auth.users FOR each row
        EXECUTE PROCEDURE public.handle_new_user();
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        location VARCHAR(255),
        date DATE NOT NULL,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        summary TEXT NOT NULL,
        description TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by VARCHAR REFERENCES users(email),
        image_dir VARCHAR NOT NULL
      );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users_events (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
        event_id INT REFERENCES events(id) ON DELETE CASCADE,
        signed_up_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (user_id, event_id)
      );
      `);
    })
    .then(() => {
      const createUsersPromises = usersData.map((user) => {
        return supabaseAdmin.auth.admin.createUser({
          email: user.email,
          email_confirm: true,
          password: "password123",
          user_metadata: {
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
          },
        });
      });
      return Promise.all(createUsersPromises);
    })
    .then(() => {
      const insertEventsQueryStr = format(
        `INSERT INTO events (title, location, date, start_time, end_time, summary, description, created_at, updated_at, created_by, image_dir) VALUES %L`,
        eventsData.map(
          ({
            title,
            location,
            date,
            start_time,
            end_time,
            summary,
            description,
            created_at,
            updated_at,
            created_by,
            image_dir,
          }) => [
            title,
            location,
            date,
            start_time,
            end_time,
            summary,
            description,
            created_at,
            updated_at,
            created_by,
            image_dir,
          ]
        )
      );
      return db.query(insertEventsQueryStr);
    });
};

module.exports = seed;
