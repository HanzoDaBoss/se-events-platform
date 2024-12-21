const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const apiRouter = require("./routes/api-router");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors/errors");

const app = express();

let corsOptions = {
  origin: ["http://localhost:5173", "https://wentevent.netlify.app"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "Not found" });
});

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);

module.exports = app;
