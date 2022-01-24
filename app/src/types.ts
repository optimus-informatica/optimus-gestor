export interface State {
  sidebar: boolean;
  title: string;
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
  nivel: number;
  rules: Rules;
}

export interface ProfileRequest {
  name: string;
  username: string;
  email: string;
  role_id: number;
  nivel: number;
  rules: Rules;
}

export interface LoginResponse {
  message: string;
  errors: {
    username?: string[];
    password?: string[];
  };
}

export interface ProfileResponse {
  message: string;
  errors: {
    name?: string[];
    username?: string[];
    email?: string[];
    role_id?: string[];
    nivel?: string[];
    rules?: string[];
  };
}
