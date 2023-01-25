import {
  addScreenshot,
  createProject,
  getAllProject,
} from "../controllers/project-controller.js";

import multer, { FileFilterCallback } from "multer";
import express from "express";
import { DestinationCallback, FileNameCallback } from "types";

const projectRouter = express.Router();
const fileStorage = multer.diskStorage({
  destination: (
    _: express.Request,
    __: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, "public/storage");
  },
  filename: (
    _: express.Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    callback(null, file.originalname);
  },
});

const fileFilter = (
  _: express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

projectRouter.post(
  "/projects",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("poster"),
  createProject
);
projectRouter.post(
  "/screenshots",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("screen"),
  addScreenshot
);

projectRouter.get("/projects", getAllProject);

export default projectRouter;
