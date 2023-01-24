import { Schema, model } from "mongoose";
import { ProjectType } from "../types";

const projectSchema = new Schema<ProjectType>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  poster: {
    type: Schema.Types.String,
    required: true,
  },
  url: {
    type: Schema.Types.String,
    required: true,
  },
  tag: {
    type: Schema.Types.String,
    required: true,
  },
  tools: {
    type: Schema.Types.Mixed,
    required: true,
  },
  id: {
    type: Schema.Types.String,
    required: true,
  },
});

const Project = model("Project", projectSchema);

export default Project;
