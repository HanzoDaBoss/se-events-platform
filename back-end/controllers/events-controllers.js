const {
  selectEvents,
  selectEventById,
  insertEvent,
  updateEventById,
  removeEventById,
} = require("../models/events-models");
const { authoriseUser } = require("../utils/authoriseUser");

exports.getEvents = (request, response, next) => {
  authoriseUser(request, response)
    .then((userData) => {
      selectEvents(userData).then((events) => {
        response.status(200).send({ events });
      });
    })
    .catch(next);
};

exports.getEventById = (request, response, next) => {
  const { event_id } = request.params;
  authoriseUser(request, response)
    .then((userData) => {
      selectEventById(userData, event_id).then((event) => {
        response.status(200).send({ event });
      });
    })
    .catch(next);
};

exports.postEvent = (request, response, next) => {
  const { body } = request;
  authoriseUser(request, response)
    .then((userData) => {
      insertEvent(userData, body)
        .then((event) => {
          response.status(201).send({ event });
        })
        .catch(next);
    })
    .catch(next);
};

exports.patchEventById = (request, response, next) => {
  const { event_id } = request.params;
  const { body } = request;
  authoriseUser(request, response)
    .then((userData) => {
      updateEventById(userData, event_id, body)
        .then((event) => {
          response.status(200).send({ event });
        })
        .catch(next);
    })
    .catch(next);
};

exports.deleteEventById = (request, response, next) => {
  const { event_id } = request.params;
  authoriseUser(request, response)
    .then((userData) => {
      removeEventById(userData, event_id)
        .then(() => {
          response.status(204).send();
        })
        .catch(next);
    })
    .catch(next);
};
