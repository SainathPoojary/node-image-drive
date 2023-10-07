import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// export interface AuthRequest extends Request {
//   user: {
//     user_id: string;
//     email: string;
//   };
// }

export interface Decode extends JwtPayload {
  user_id: string;
  email: string;
}

export interface Image {
  public_id: string;
  url: string;
  // name: string;
}

declare module "express" {
  interface Request {
    user?: {
      user_id: string;
      email: string;
    };
  }
}
