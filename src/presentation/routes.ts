import { Router } from "express";
import { Authroutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    //Defino las rutas principales
    router.use("/api/auth", Authroutes.routes);

    return router;
  }
}
