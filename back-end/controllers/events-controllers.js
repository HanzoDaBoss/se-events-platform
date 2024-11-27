const { selectEvents } = require("../models/events-models");

exports.getEvents = (request, response, next) => {
  selectEvents()
    .then((events) => {
      response.status(200).send({ events });
    })
    .catch(next);
};
