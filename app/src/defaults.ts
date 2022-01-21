import { User, Rules, State } from '@/types';
import axios, { AxiosInstance } from 'axios';

export const http = (): AxiosInstance =>
  axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

export const user = (): User => ({
  id: 0,
  name: '',
  username: '',
  email: '',
  role_id: 0,
  nivel: 100,
  rules: rules(),
  created_at: '',
  updated_at: '',
});

export const rules = (): Rules => ({
  user: [],
  client: [],
  product: [],
  service: [],
  order: [],
});

export const state = (): State => ({
  sidebar: false,
  user: user(),
});
