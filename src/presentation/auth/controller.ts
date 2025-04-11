import { Request, Response } from "express";

export class AuthController {
  // DI
  constructor() {}

  loginUser = (req: Request, res: Response) => {
    res.json({ message: "loginUser" });
  };

  registerUser = (req: Request, res: Response) => {
    res.json({ message: "registerUser" });
  };

  validateEmail = (req: Request, res: Response) => {
    res.json({ message: "validateEmail" });
  };
}
