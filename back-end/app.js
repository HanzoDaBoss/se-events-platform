const express = require("express");
const {
  getEvents,
  getEventById,
  postEvent,
  patchEventById,
} = require("./controllers/events-controllers");
const { getHealthCheck } = require("./controllers/health-check-controllers");

const app = express();

app.use(express.json());

app.get("/api/healthcheck", getHealthCheck);

app.get("/api/events", getEvents);
app.post("/api/events", postEvent);

app.get("/api/events/:event_id", getEventById);
app.patch("/api/events/:event_id", patchEventById);

app.use((error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else next(error);
});

module.exports = app;
