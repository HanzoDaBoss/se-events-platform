const {
  insertUserEventByEventId,
  removeUserEventByEventId,
} = require("../models/users-events-models");
const { authoriseUser } = require("../utils/authoriseUser");

exports.postUserEventByEventId = (request, response, next) => {
  const { event_id } = request.params;
  authoriseUser(request, response)
    .then((userData) => {
      insertUserEventByEventId(userData, event_id)
        .then((userEvent) => {
          response.status(201).send({ userEvent });
        })
        .catch(next);
    })
    .catch(next);
};

exports.deleteUserEventByEventId = (request, response, next) => {
  const { event_id } = request.params;
  authoriseUser(request, response)
    .then((userData) => {
      removeUserEventByEventId(userData, event_id)
        .then(() => {
          response.status(204).send();
        })
        .catch(next);
    })
    .catch(next);
};
