// To configure express config
import express, { Express, json, urlencoded, Request, Response, NextFunction } from "express";
import cors from "cors";
import { SampleRouter } from "./routers/sample.router";
import { AuthRouter } from "./routers/auth.router";
import { redisClient } from "./helpers/redis";
import { PostsRouter } from "./routers/posts.router";

const PORT = 7070;

export default class App {
    readonly app: Express;

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
        const authRouter = new AuthRouter();
        const postsRouter = new PostsRouter();

        this.app.get("/", async (req: Request, res: Response) => {
            return res.status(200).send("<h1>Welcome to Free Blog API</h1>")
        })
        this.app.use("/samples", sampleRouter.getRouter());
        this.app.use("/auth", authRouter.getRouter());
        this.app.use("/posts", postsRouter.getRouter());
    }

    // Deefine error handling
    private handleError(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.log("ERROR : ", err);
            return res.status(500).send(err);
        })
    }

    public async start(): Promise<void> {
        await redisClient.connect(); // connect to redis
        this.app.listen(PORT, () => {
            console.log(`API RUNNING : http://localhost:${PORT}/`);
        })
    }
}