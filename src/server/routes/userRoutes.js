import express from "express";
import { getAllUser, signIn, signUp } from "../controller/userController.js";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/signup",
  [
    check("firstName")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("A valid name is required"),
    check("lastName")
      .trim()
      .isLength({ min: 3 })
      .escape()
      .withMessage("A valid name is required"),
    check("email")
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email address is required"),
    check("password")
      .trim()
      .isLength({ min: 8 })
      .escape()
      .withMessage("A password must be at least 8 characters"),
  ],
  signUp
);
router.post("/signin", signIn);
router.get("/allUser", getAllUser);

export default router;
