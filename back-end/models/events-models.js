const db = require("../db/connection");

exports.selectEvents = () => {
  return db
    .query(
      `
    SELECT * FROM events;
    `
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectEventById = (event_id) => {
  return db
    .query(
      `
    SELECT * FROM events
    WHERE events.id = $1;
    `,
      [event_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Article not found",
        });
      }
      return rows[0];
    });
};

exports.insertEvent = ({
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
}) => {
  const insertVals = [
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
  ];
  if (insertVals.includes(undefined)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `
  INSERT INTO events (title, location, date, start_time, end_time, summary, description, created_at, updated_at, created_by, image_dir)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, COALESCE($11, 'images/events/placeholder.jpg'))
  RETURNING *;
  `,
      [...insertVals, image_dir]
    )

    .then(({ rows }) => {
      return rows[0];
    });
};
