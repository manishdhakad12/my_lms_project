import express from "express";
import { register, login, getUserProfile, logout, updateProfile, makeInstructor, getCurrentUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);
router.route("/profile/update").put(isAuthenticated, upload.single("profilePhoto"), updateProfile);
router.route("/role/instructor").put(isAuthenticated, makeInstructor);
router.route("/me").put(isAuthenticated, getCurrentUser);

export default router;