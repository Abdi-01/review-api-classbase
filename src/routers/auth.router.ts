import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
// import { body, validationResult } from "express-validator";
import { regisValidation } from "../middleware/validator";
export class AuthRouter {
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/regis", regisValidation, this.authController.registerUser);
        this.router.post("/forgot", this.authController.forgotPassword);
    }

    getRouter(): Router {
        return this.router;
    }
}