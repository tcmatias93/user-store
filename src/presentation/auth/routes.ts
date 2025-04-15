import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";

export class Authroutes {
  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();

    const controller = new AuthController(authService);

    //Definicion de las rutas
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    //Todo esto se hara luego pero ya creo la ruta para tener el nombre
    router.get("/validate-email/:token", controller.validateEmail);

    return router;
  }
}
