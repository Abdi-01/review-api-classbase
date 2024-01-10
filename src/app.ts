// To configure express config
import express, { Express, json, urlencoded, Request, Response, NextFunction } from "express";
import cors from "cors";
import { SampleRouter } from "./routers/sample.router";

const PORT = 7070;

export default class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.configure(); // execute config methode
        this.routes();
        this.handleError();
    }

    private configure(): void {
        this.app.use(cors()); // to give access for FE
        this.app.use(json()); // to read req.body
        this.app.use(urlencoded({ extended: true })); // to accept req.body form type
    }

    // To define routes config from routers directory
    private routes(): void {
        const sampleRouter = new SampleRouter();

        this.app.use("/samples", sampleRouter.getRouter());
    }

    // Deefine error handling
    private handleError(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.log("ERROR : ", err);
            return res.status(500).send(err);
        })
    }

    public start(): void {
        this.app.listen(PORT, () => {
            console.log(`API RUNNING : http://localhost:${PORT}/`);
        })
    }
}