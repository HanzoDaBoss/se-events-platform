const {
  selectEvents,
  selectEventById,
  insertEvent,
  updateEventById,
  removeEventById,
} = require("../models/events-models");

const { supabaseUser } = require("../db/supabase-connection");

const authoriseUser = (request, response) => {
  const { accessToken } = request.cookies;
  const refresh_token = request.cookies.refreshToken;

  return supabaseUser.auth.getUser(accessToken).then(({ data, error }) => {
    if (error) {
      return supabaseUser.auth
        .refreshSession({ refresh_token })
        .then(({ data, error }) => {
          if (error) {
            return Promise.reject({
              status: error.status,
              msg: "Unauthorised user",
            });
          }
          const newAccessToken = data.session.access_token;
          const newRefreshToken = data.session.refresh_token;
          response.cookie("accessToken", newAccessToken, {
            secure: true,
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // Set the expiration time (1 hour in this example)
          });
          response.cookie("refreshToken", newRefreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // Set the expiration time (7 days in this example)
          });
          return data;
        });
    }
    return data;
  });
};

exports.getEvents = (request, response, next) => {
  authoriseUser(request, response)
    .then((data) => {
      selectEvents().then((events) => {
        response.status(200).send({ events });
      });
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

exports.deleteEventById = (request, response, next) => {
  const { event_id } = request.params;
  removeEventById(event_id)
    .then(() => {
      response.status(204).send();
    })
    .catch(next);
};
