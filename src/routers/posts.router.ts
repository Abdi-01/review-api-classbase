import { Router } from "express";
import { PostsController } from "../controllers/posts.controller";

export class PostsRouter {
    private router: Router;
    private postsController: PostsController;
    constructor() {
        this.postsController = new PostsController();
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get("/", this.postsController.getPosts);
    }

    getRouter(): Router {
        return this.router;
    }
}