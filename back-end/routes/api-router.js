const eventsRouter = require("./events-router");
const usersEventsRouter = require("./users-events-router");
const usersRouter = require("./users-router");

const apiRouter = require("express").Router();

apiRouter.use("/events", eventsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/users-events", usersEventsRouter);

module.exports = apiRouter;
