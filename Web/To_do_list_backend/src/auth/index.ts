import jwt from "jsonwebtoken";
import { iUser } from "../interfaces/iUser";

export class Auth {
  public static sign(data: iUser) {
    return jwt.sign({ id: data.id }, "secret");
  }
  public static verify(token: string) {
    try {
      return jwt.verify(token, "secret");
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
