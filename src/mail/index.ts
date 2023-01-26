import { Edge } from "edge.js";
import path, { join } from "path";
import gmailTransport from "./gmail";
import dotenv from "dotenv";

dotenv.config();

const edge = new Edge({ cache: false });
const templatesPath = join(path.resolve(), "src/mail/templates");
edge.mount(templatesPath);

const send = (to: string, subject: string, html: any) => {
  const options = {
    to,
    subject,
    html,
    from: process.env.GMAIL_USER,
  };

  return gmailTransport.sendMail(options);
};

export const sendReplay = async (to: string, name: string) => {
  const html = edge.renderSync("thanks", {
    name,
  });

  return send(to, "Greeting", html);
};
