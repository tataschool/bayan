export type UserRole = 'admin' | 'trainee';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  specialization?: string;
}

export type ResourceType = 'text' | 'skill' | 'presentation';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  content: string;
  url?: string;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  module: string;
  image: string;
  resources: Resource[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}