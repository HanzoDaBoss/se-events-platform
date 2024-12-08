import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const postLogin = (loginObj) => {
  return api
    .post(`/users/login`, loginObj)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const getEvents = (filter_by, sort, order_by) => {
  const filter = filter_by || undefined;
  const sort_by = sort || undefined;
  const order = order_by || undefined;
  return api
    .get(`/events`, {
      params: {
        filter,
        sort_by,
        order,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const getEventById = (event_id) => {
  return api
    .get(`/events/${event_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const postUserEventByEventId = (event_id) => {
  return api
    .post(`/users-events/${event_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deleteUserEventByEventId = (event_id) => {
  return api.delete(`/users-events/${event_id}`).catch((error) => {
    return error.response;
  });
};

export {
  postLogin,
  getEvents,
  getEventById,
  postUserEventByEventId,
  deleteUserEventByEventId,
};
