import { AxiosStatic } from 'axios';

export interface Store {
  sidebar: boolean;
  axios: AxiosStatic;
  user: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  email_verified_at?: string;
  role_id: number;
  nivel: number;
  rules: Rules;
  created_at: string;
  updated_at: string;
}

export interface Rules {
  user: string[];
  client: string[];
  product: string[];
  service: string[];
  order: string[];
}

export interface Role {
  id: number;
  name: string;
  rules: Rules;
}
