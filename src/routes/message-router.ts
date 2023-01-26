import { createMessage } from "../controllers/message-controller.js";
import express from "express";

const messageRouter = express.Router();

messageRouter.post("/message", createMessage);

export default messageRouter;
