import { Request, Response } from "express";
import Message from "../models/Message.js";
import messageSchema from "../schemas/message-schema.js";
import { sendReplay } from "../mail";

export const createMessage = async (req: Request, res: Response) => {
  const { body } = req;

  const validator = await messageSchema();

  const { value, error } = validator.validate(body);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { name, email, text } = value;

  await Message.create({
    name,
    text,
    email,
  });

  await sendReplay(email, name);

  return res.status(200).json({ message: "message send successfully" });
};
