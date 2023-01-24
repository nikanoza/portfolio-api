export interface NewProject {
  name: string;
  description: string;
  url: string;
  tag: string;
  tools: string[];
}

export interface ProjectType extends NewProject {
  id: string;
}
