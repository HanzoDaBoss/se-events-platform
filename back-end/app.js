const express = require("express");
const { getEvents } = require("./controllers/events-controllers");
const { getHealthCheck } = require("./controllers/health-check-controllers");

const app = express();

app.use(express.json());

app.get("/api/healthcheck", getHealthCheck);

app.get("/api/events", getEvents);

module.exports = app;
