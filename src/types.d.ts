export interface NewProject {
  name: string;
  description: string;
  url: string;
  poster: string;
  tag: string;
  tools: string[];
}

export interface ProjectType extends NewProject {
  id: string;
}

export interface ScreenshotType {
  screen: string;
  projectId: string;
}

export type MessageType = {
  name: string;
  email: string;
  text: string;
};

export type DestinationCallback = (
  error: Error | null,
  destination: string
) => void;
export type FileNameCallback = (error: Error | null, filename: string) => void;
