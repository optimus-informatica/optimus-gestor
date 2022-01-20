import { User, Rules, State } from '@/types';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

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
  axios,
});
