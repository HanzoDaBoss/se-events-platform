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

const postRegister = (registerObj) => {
  return api
    .post(`/users/register`, registerObj)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

const deleteLogout = () => {
  return api
    .delete(`/users/logout`)
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

const postEvent = (eventObj) => {
  return api.post(`/events`, eventObj).then((response) => {
    return response;
  });
};

const updateEventById = (event_id, eventObj) => {
  return api.patch(`/events/${event_id}`, eventObj).then((response) => {
    return response;
  });
};

export {
  postLogin,
  postRegister,
  deleteLogout,
  getEvents,
  getEventById,
  postUserEventByEventId,
  deleteUserEventByEventId,
  postEvent,
  updateEventById,
};
