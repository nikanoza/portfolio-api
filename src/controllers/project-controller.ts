import { Request, Response } from "express";
import Project from "../models/Project.js";
import createProjectSchema from "../schemas/create-project-schema.js";
import { v4 as uuidv4 } from "uuid";
import Screenshot from "../models/Screenshot.js";

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

export const addScreenshot = async (req: Request, res: Response) => {
  const { file, body } = req;

  const project = await Project.findOne({ id: body.projectId });

  if (!project) {
    return res
      .status(402)
      .json({ message: "there is no project with this id" });
  }

  await Screenshot.create({
    screen: file ? "/storage/" + file.originalname : "",
    projectId: body.projectId,
  });

  return res.status(201).json({ message: "new screenshot added" });
};

export const getAllProject = async (_: Request, res: Response) => {
  const projects = await Project.find();
  const screenshots = await Screenshot.find();

  const transformedData = projects.map((project) => {
    return {
      name: project.name,
      description: project.description,
      url: project.url,
      poster: project.poster,
      tags: project.tag,
      tools: project.tools,
      id: project.id,
      screens: screenshots
        .filter((screen) => screen.projectId === project.id)
        .map((screen) => screen.screen),
    };
  });

  return res.status(200).json(transformedData);
};

export const getSingleProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await Project.findOne({ id });

  if (!project) {
    return res
      .status(402)
      .json({ message: "there is no project with this id" });
  }

  const screenshots = await Screenshot.find({ projectId: id });

  const transformedData = {
    name: project.name,
    description: project.description,
    url: project.url,
    poster: project.poster,
    tags: project.tag,
    tools: project.tools,
    id: project.id,
    screens: screenshots
      .filter((screen) => screen.projectId === project.id)
      .map((screen) => screen.screen),
  };
  return res.status(200).json(transformedData);
};
