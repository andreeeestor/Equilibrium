import { auth } from "../middleware/auth";
import { login, logout, register } from "../controllers/AuthController";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", auth, logout);
authRouter.get("/me", auth, (req, res) => {
  res.json({ user: req.user });
});

export default authRouter;
