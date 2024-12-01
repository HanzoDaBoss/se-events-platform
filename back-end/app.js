const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {
  getEvents,
  getEventById,
  postEvent,
  patchEventById,
  deleteEventById,
} = require("./controllers/events-controllers");
const { getHealthCheck } = require("./controllers/health-check-controllers");
const { postLogin, postRegister } = require("./controllers/users-controllers");
const {
  postUserEventByEventId,
} = require("./controllers/users-events-controllers");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/api/healthcheck", getHealthCheck);

app.get("/api/events", getEvents);
app.post("/api/events", postEvent);

app.get("/api/events/:event_id", getEventById);
app.patch("/api/events/:event_id", patchEventById);
app.delete("/api/events/:event_id", deleteEventById);

app.post("/api/users/login", postLogin);

app.post("/api/users/register", postRegister);

app.post("/api/users-events/:event_id", postUserEventByEventId);

app.use((error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else next(error);
});

app.use((error, request, response, next) => {
  if (error.code === "22P02") {
    response.status(400).send({ msg: "Bad request" });
  } else next(error);
});

app.use((error, request, response, next) => {
  if (error.code === "23503") {
    response.status(404).send({ msg: "Not found" });
  } else next(error);
});

app.use((error, request, response, next) => {
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
