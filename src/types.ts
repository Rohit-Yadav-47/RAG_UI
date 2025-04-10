export interface Document {
  id: string;
  title: string;
  content: string;
  embedding: number[];
  created_at: string;
  status: 'processing' | 'ready' | 'error';
  type: 'pdf' | 'txt' | 'doc';
  size: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  sources?: {
    title: string;
    content: string;
  }[];
}

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  messages: ChatMessage[];
}

export interface Settings {
  theme: 'light' | 'dark';
  model: string;
  temperature: number;
  maxTokens: number;
}