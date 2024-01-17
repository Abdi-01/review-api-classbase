import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { redisClient } from "../helpers/redis";
export class PostsController {
    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            // 1. Check data in redis
            const redisData = await redisClient.get("posts");
            // 2. If exist, use data from redis and send as reponse
            if (redisData) {
                return res.status(200).send(JSON.parse(redisData));
            }

            // 3. If not exist, get data from main resource
            const get = await axios.get("https://jsonplaceholder.typicode.com/posts");
            await redisClient.setEx("posts", 5, JSON.stringify(get.data));
            return res.status(200).send(get.data);
        } catch (error) {
            next(error);
        }
    }
}