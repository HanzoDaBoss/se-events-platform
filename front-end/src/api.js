import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const postLogin = (loginObj) => {
  return api
    .post(`/users/login`, loginObj)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};

const getEvents = (filter_by, sort, order_by) => {
  const filter = filter_by || undefined;
  const sort_by = sort || undefined;
  const order = order_by || undefined;
  return api
    .get(`/articles`, {
      params: {
        filter,
        sort_by,
        order,
      },
    })
    .then(({ data }) => {
      return data.events;
    })
    .catch((error) => {
      return error.response;
    });
};

export { postLogin, getEvents };
