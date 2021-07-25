import express from "express";
import "express-async-errors";
import * as authController from "../controller/auth.js";

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/me", (req, res, next) => {
  res.status(201).json(token);
});

export default router;
