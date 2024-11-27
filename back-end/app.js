const express = require("express");
const { getEvents, getEventById } = require("./controllers/events-controllers");
const { getHealthCheck } = require("./controllers/health-check-controllers");

const app = express();

app.use(express.json());

app.get("/api/healthcheck", getHealthCheck);

app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEventById);

module.exports = app;
