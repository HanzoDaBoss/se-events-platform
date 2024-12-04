const {
  getEvents,
  postEvent,
  getEventById,
  patchEventById,
  deleteEventById,
} = require("../controllers/events-controllers");

const eventsRouter = require("express").Router();

eventsRouter.route("/").get(getEvents).post(postEvent);

eventsRouter
  .route("/:event_id")
  .get(getEventById)
  .patch(patchEventById)
  .delete(deleteEventById);

module.exports = eventsRouter;
