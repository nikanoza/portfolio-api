import { Schema, model } from "mongoose";
import { MessageType } from "types";

const messageSchema = new Schema<MessageType>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
  },
  text: {
    type: Schema.Types.String,
    required: true,
  },
});

const Message = model("Message", messageSchema);

export default Message;
