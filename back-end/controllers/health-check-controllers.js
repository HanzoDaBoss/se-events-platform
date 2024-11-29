exports.getHealthCheck = (request, response, next) => {
  response.status(200).send("App is working");
};
