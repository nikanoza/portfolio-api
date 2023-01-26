import Joi from "joi";
import { MessageType } from "types";

const messageSchema = async () => {
  return Joi.object<MessageType>({
    name: Joi.string().required().messages({
      "string.base": "name must be a string",
      "any.required": "name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "email must be a string",
      "any.required": "email is required",
    }),
    text: Joi.string().required().messages({
      "string.base": "text must be a string",
      "any.required": "text is required",
    }),
  });
};

export default messageSchema;
