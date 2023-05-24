const express = require("express");
const Router = express.Router();
const userController = require("../controllers/user/userCreate");

// Router.route("/verifyOTP").post(authController.verifyOTP);
Router.route("/login").post(userController.login);
Router.route("/signup").post(userController.signup);
Router.route("/getall").get(userController.getAll);
Router.route("/update/:id").put(userController.updateUser)

// Router.route("/logout").post(authController.logout);
Router.route("/forgetPassword").put(userController.forgetPassword);
// Router.route("/socialLogin").post(authController.socialLogin);

//=================

module.exports = Router;
