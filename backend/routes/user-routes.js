import express from "express";
import usersControllers from "../controllers/user-controllers.js";
import { check } from "express-validator";

const userRoutes = express.Router();

userRoutes.post("/login", usersControllers.login);
userRoutes.post(
  "/register",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  usersControllers.registerUser,
);

export default userRoutes;
