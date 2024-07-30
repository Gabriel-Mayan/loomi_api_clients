import { IDatabaseUser } from "../interfaces/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: IDatabaseUser;
    }
  }
}