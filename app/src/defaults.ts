import {
  User,
  Rules,
  State,
  Role,
  ProfileRequest,
  ProfileResponse,
} from '@/types';
import axios, { AxiosInstance } from 'axios';

export const http = (): AxiosInstance => {
  const token = localStorage.getItem('_optimus_gestor_token');
  const contentType = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const headers = token
    ? { ...contentType, Authorization: `Bearer ${token}` }
    : { ...contentType };

  return axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
    timeout: 1000,
    headers,
  });
};

export const user = (): User => ({
  id: 0,
  name: '',
  username: '',
  email: '',
  role_id: 0,
  nivel: 0,
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
  token: localStorage.getItem('_optimus_gestor_token'),
  title: 'Home',
  user: user(),
});

export const role = (): Role => ({
  id: 0,
  name: '',
  nivel: 0,
  rules: rules(),
});

export const profileRequest = (user: User): ProfileRequest => ({
  name: user.name,
  username: user.username,
  email: user.email,
  role_id: user.role_id,
  nivel: user.nivel,
  rules: user.rules,
});

export const profileResponse = (): ProfileResponse => ({
  message: ' ',
  errors: {},
});

export const translates = () => ({
  user: 'Usuário',
  client: 'Cliente',
  product: 'Produto',
  service: 'Serviço',
  order: 'Ordem de Serviço',
  create: 'Registrar',
  delete: 'Remover',
  update: 'Editar',
  read: 'Vizualizar',
});

export const sessions = () => ['user', 'client', 'product', 'service', 'order'];
export const permissions = () => ['create', 'delete', 'update', 'read'];
