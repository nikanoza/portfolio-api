import express from "express";
import dotenv from "dotenv";
import connect from "./config/mongo.js";

dotenv.config();
connect();

const server = express();

server.listen(process.env.PORT || 3000);
