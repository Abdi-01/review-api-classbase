import { Router } from "express";
import { SampleController } from "../controllers/sample.controller";

export class SampleRouter {
    private router: Router; // mendifine interface/type yang diterapkan pada methode
    private sampleController: SampleController;

    constructor() {
        this.router = Router();
        this.sampleController = new SampleController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.sampleController.getSample);
        this.router.post("/", this.sampleController.createSample);
    }

    getRouter(): Router {
        return this.router;
    }
}