const db = require("../db/connection");

exports.insertUserEventByEventId = (userData, event_id) => {
  const userId = userData.user.id;
  const insertVals = [userId, event_id];
  if (insertVals.includes(undefined)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `
  INSERT INTO users_events (user_id, event_id)
  VALUES
  ($1, $2)
  RETURNING *;
  `,
      insertVals
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
