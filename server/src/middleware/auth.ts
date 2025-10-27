import { User } from "../models/user";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

// isso aqui serve apenas para o TypeScript não "reclamar" depois do authMiddleware rodar
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Autenticação obrigatória!" });
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
    ) as any
    const user = await User.findById(decoded.userId)

    if(!user) {
        return res.status(401).json({ message: "Usuário não encontrado" })
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Toekn de autenticação inválida" })
  }
};
