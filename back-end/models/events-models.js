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
