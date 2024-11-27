const express = require("express");
const { getEvents } = require("./controllers/events-controllers");

const app = express();

app.use(express.json());

app.get("/api/events", getEvents);

module.exports = app;
