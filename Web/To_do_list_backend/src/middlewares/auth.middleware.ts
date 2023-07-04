import { NextFunction, Request, Response } from "express";
import { Auth } from "../auth";

export class AuthMiddleware {
  public static auth(request: Request, response: Response, next: NextFunction) {
    const headers: { [key: string]: string } = request.headers as any;
    const token = headers["authorization"]?.split(" ")[1];
    const perm: { [key: string]: string } = Auth.verify(token) as any;
    if (!perm) {
      return response.status(401).json({ message: "Não autorizado." });
    }
    response.locals.id = perm.id;
    next();
  }
}
