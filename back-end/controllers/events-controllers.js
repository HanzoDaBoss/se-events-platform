const { selectEvents, selectEventById } = require("../models/events-models");

exports.getEvents = (request, response, next) => {
  selectEvents()
    .then((events) => {
      response.status(200).send({ events });
    })
    .catch(next);
};

exports.getEventById = (request, response, next) => {
  const { event_id } = request.params;
  selectEventById(event_id)
    .then((event) => {
      response.status(200).send({ event });
    })
    .catch(next);
};
