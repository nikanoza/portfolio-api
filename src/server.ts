import express from "express";
import dotenv from "dotenv";
import connect from "./config/mongo.js";
import projectRouter from "./routes/project-router.js";
import swaggerMiddleware from "./swagger-middleware.js";
import cors from "cors";
import bodyParser from "body-parser";
import messageRouter from "routes/message-router.js";

dotenv.config();
connect();

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use("/storage", express.static("public/storage"));
server.use("/api", cors(), projectRouter);
server.use("/api", messageRouter);
server.use("/", ...swaggerMiddleware);

server.listen(process.env.PORT || 3000);
