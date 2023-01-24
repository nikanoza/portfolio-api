import express from "express";
import dotenv from "dotenv";
import connect from "./config/mongo.js";
import projectRouter from "./routes/project-router.js";
import swaggerMiddleware from "./swagger-middleware.js";

dotenv.config();
connect();

const server = express();

server.use("/api", projectRouter);
server.use("/", ...swaggerMiddleware);

server.listen(process.env.PORT || 3000);
