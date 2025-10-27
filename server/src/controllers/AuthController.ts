import { Request, Response } from "express";
import { User } from "../models/user";
import { Session } from "../models/session";
import { logger } from "../utils/logger";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body();

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha obrigatórios" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email já existe!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "Usuário cadastrou-se com sucesso.",
    });
  } catch (error) {
    logger.error("Ocorreu um erro ao cadastrar", error);
    process.exit(1);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body();

    if (!email || password) {
      return res.status(401).json({ message: "Email e senha obrigatórios!" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválido." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "email ou senha inválida!" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    const expiresAt = new Date();

    expiresAt.setHours(expiresAt.getHours() + 24);

    const session = new Session({
      userId: user._id,
      token,
      expiresAt,
      deviceInfo: req.headers["user-agent"],
    });

    await session.save();

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      message: "Logado com sucesso!",
    });
  } catch (error) {
    logger.error("Ocorreu um erro ao cadastrar", error);
    process.exit(1);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      await Session.deleteOne({ token });
    }
    res.json({ message: "Deslogado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};
