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
    created_by,
  ];
  if (insertVals.includes(undefined)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `
  INSERT INTO events (title, location, date, start_time, end_time, summary, description, created_by, image_dir)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, COALESCE($9, 'images/events/placeholder.jpg'))
  RETURNING *;
  `,
      [...insertVals, image_dir]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateEventById = (
  event_id,
  {
    title,
    location,
    date,
    start_time,
    end_time,
    summary,
    description,
    created_at,
    created_by,
    image_dir,
  }
) => {
  const updateVals = [
    title,
    location,
    date,
    start_time,
    end_time,
    summary,
    description,
    created_at,
    created_by,
    image_dir,
    event_id,
  ];
  if (updateVals.includes(undefined)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `
  UPDATE events 
  SET title = $1, location = $2, date = $3, start_time = $4, end_time = $5, summary = $6, description = $7, created_at = $8, created_by = $9, image_dir = $10
  WHERE id = $11
  RETURNING *;
  `,
      updateVals
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.removeEventById = (event_id) => {
  return db.query(
    `
    DELETE FROM events
    WHERE id = $1;
    `,
    [event_id]
  );
};
