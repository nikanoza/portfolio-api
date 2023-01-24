import { Schema, model } from "mongoose";
import { ScreenshotType } from "types";

const screenshotSchema = new Schema<ScreenshotType>({
  screen: {
    type: Schema.Types.String,
    required: true,
  },
  projectId: {
    type: Schema.Types.String,
    required: true,
  },
});

const Screenshot = model("Screenshot", screenshotSchema);

export default Screenshot;
