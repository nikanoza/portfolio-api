import { Request, Response } from "express";
import Project from "../models/Project.js";
import createProjectSchema from "../schemas/create-project-schema.js";
import { v4 as uuidv4 } from "uuid";

export const createProject = async (req: Request, res: Response) => {
  const { file, body } = req;

  const reqBody = {
    ...body,
    tools: body.tools.split(","),
    poster: file ? "/storage/" + file.originalname : "",
  };

  const validator = await createProjectSchema(reqBody);

  const { value, error } = validator.validate(reqBody);

  if (error) {
    return res.status(422).json(error.details);
  }

  const { name, poster, description, tools, url, tag } = value;

  const id = uuidv4();

  await Project.create({
    name,
    description,
    tools,
    url,
    tag,
    poster,
    id,
  });

  return res.status(201).json({ message: "new project added" });
};
