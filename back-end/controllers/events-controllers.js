const {
  selectEvents,
  selectEventById,
  insertEvent,
  updateEventById,
} = require("../models/events-models");

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

exports.postEvent = (request, response, next) => {
  const { body } = request;
  insertEvent(body)
    .then((event) => {
      response.status(201).send({ event });
    })
    .catch(next);
};

exports.patchEventById = (request, response, next) => {
  const { event_id } = request.params;
  const { body } = request;
  updateEventById(event_id, body)
    .then((event) => {
      response.status(200).send({ event });
    })
    .catch(next);
};
