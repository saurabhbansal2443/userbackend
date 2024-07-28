import express from "express";
import {
  signup,
  login,
  updateUser,
  logout,
  getUser,
} from "../Controllers/user.controller.js";
let Router = express.Router();

Router
  .post("/signup", signup)
  .post("/login", login)
  .get("/", getUser)
  .patch("/update", updateUser)
  .post("/logout", logout);

  export default Router;    
