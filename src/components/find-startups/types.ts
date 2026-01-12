export interface GitHubResult {
  name: string;
  url: string;
  description: string;
  stars: number;
  language: string;
}

export interface ChatResponse {
  content: string;
  citations?: string[];
  sheetUpdated?: boolean;
  error?: string;
  githubResults?: GitHubResult[];
}

export interface Startup {
  name: string;
  description: string;
  features: string[];
  funding_stage: string;
  url: string;
}

export interface InputProps {
  onChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  value: string;
  error?: boolean;
  placeholder?: string;
}
