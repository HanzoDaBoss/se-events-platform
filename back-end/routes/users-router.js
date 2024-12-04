const {
  postLogin,
  postRegister,
  deleteLogout,
} = require("../controllers/users-controllers");

const usersRouter = require("express").Router();

usersRouter.route("/login").post(postLogin);

usersRouter.route("/register").post(postRegister);

usersRouter.route("/logout").delete(deleteLogout);

module.exports = usersRouter;
