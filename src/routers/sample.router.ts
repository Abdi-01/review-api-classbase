import { Router } from "express";
import { SampleController } from "../controllers/sample.controller";
import { uploader } from "../middleware/uploader";

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
        this.router.post("/upload", uploader("IMG", "/image").single("gambar"), this.sampleController.addNewImage);
        this.router.post("/multiple-upload", uploader("IMG", "/image").array("gambar", 3), this.sampleController.addMultipleImage);
    }

    getRouter(): Router {
        return this.router;
    }
}