import express from "express";
import doetnv from "dotenv";
import songRoutes from "./route.js";
import redis from "redis";
import cors from "cors";
doetnv.config();
export const redisClient = redis.createClient({
    password: process.env.Redis_Password,
    socket: {
        host: "redis-16072.crce206.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 16072,
    },
});
redisClient
    .connect()
    .then(() => console.log("connected to redis"))
    .catch(console.error);
const app = express();
app.use(cors());
app.use("/api/v1", songRoutes);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
