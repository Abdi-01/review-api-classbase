import { NextFunction, Request, Response } from "express";
import axios from "axios";

export class PostsController {
    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const get = await axios.get("https://jsonplaceholder.typicode.com/posts");
            return res.status(200).send(get.data);
        } catch (error) {
            next(error);
        }
    }
}