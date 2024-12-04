const {
  postUserEventByEventId,
  deleteUserEventByEventId,
} = require("../controllers/users-events-controllers");

const usersEventsRouter = require("express").Router();

usersEventsRouter
  .route("/:event_id")
  .post(postUserEventByEventId)
  .delete(deleteUserEventByEventId);

module.exports = usersEventsRouter;
