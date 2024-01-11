import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { body, validationResult } from "express-validator";
export class AuthRouter {
    private router: Router;
    private authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post("/regis",
            body("username").notEmpty().withMessage("Username required"),
            body("email").notEmpty().withMessage("Email required"),
            body("email").isEmail().withMessage("Email WRONG"),
            (req: Request, res: Response, next: NextFunction) => {
                const errorValidator = validationResult(req); // untuk menampung jika ada error dari middleware validator
                if (!errorValidator.isEmpty()) {
                    // Jika errorValidator tidak kosong maka akan dikirimkan response sebagai error
                    return res.status(400).send({ error: errorValidator.array() });
                }

                next(); // jika error validator kosong maka lanjut ke controller register
            },
            this.authController.registerUser);
    }

    getRouter(): Router {
        return this.router;
    }
}