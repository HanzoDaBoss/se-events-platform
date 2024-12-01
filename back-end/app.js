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

app.use((error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else next(error);
});

app.use((error, request, response, next) => {
  response.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
