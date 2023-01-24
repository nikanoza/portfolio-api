import Joi from "joi";
import Project from "../models/Project.js";
import { NewProject, ProjectType } from "types";

const determineIfProjectExists =
  (project: ProjectType | null) => (value: string, helpers: any) => {
    if (project) {
      return helpers.messages("there is project with this name");
    }

    return value;
  };

const createProjectSchema = async (data: NewProject) => {
  const project = await Project.findOne({ name: data.name });

  return Joi.object<NewProject>({
    name: Joi.string()
      .required()
      .custom(determineIfProjectExists(project))
      .messages({
        "string.base": "name must be a string",
        "any.required": "name is required",
      }),
    description: Joi.string().required().messages({
      "string.base": "description must be a string",
      "any.required": "description is required",
    }),
    url: Joi.string().required().messages({
      "string.base": "url must be a string",
      "any.required": "url is required",
    }),
    poster: Joi.string().required().messages({
      "string.base": "url must be a string",
      "any.required": "url is required",
    }),
    tag: Joi.string().required().messages({
      "string.base": "tag must be a string",
      "any.required": "tag is required",
    }),
    tools: Joi.array().items(
      Joi.string().messages({
        "string.base": "tool name must be a string",
      })
    ),
  });
};

export default createProjectSchema;
