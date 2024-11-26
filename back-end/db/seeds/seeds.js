const format = require("pg-format");
const db = require("../connection");

const seed = ({ eventsData, usersData }) => {
  return db
    .query(`DROP TRIGGER IF EXISTS on_new_user ON auth.users;`)
    .then(() => {
      `DROP FUNCTION IF EXISTS public.handle_new_user;`;
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS events;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users_events;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        id UUID NOT NULL REFERENCES auth.users ON delete cascade,
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
          VALUES (new.id, new.email, new.username, new.first_name, new.last_name, new.role);
          RETURN NEW;
        END;
        $$ language plpgsql security definer;
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TRIGGER on_new_user
        AFTER INSERT ON auth.users FOR each row
        EXECUTE PROCEDURE public.handle_new_user ();
      `);
    });
  // .then(() => {
  //   return db.query(`
  //     CREATE TABLE events (
  //       id SERIAL PRIMARY KEY,
  //       title VARCHAR(100) NOT NULL,
  //       location VARCHAR(255),
  //       date DATE NOT NULL,
  //       start_time TIMESTAMP NOT NULL,
  //       end_time TIMESTAMP NOT NULL,
  //       summary TEXT NOT NULL,
  //       description TEXT NOT NULL,
  //       image_dir VARCHAR NOT NULL,
  //       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  //       creator_id INT REFERENCES users(id)
  //     )
  //     `);
  // });
};

module.exports = seed;
