import express, { Response } from "express";

const server = express();

server.get("/", (_, res: Response) => {
  res.send("fire!");
});

server.listen(process.env.PORT || 3000);
