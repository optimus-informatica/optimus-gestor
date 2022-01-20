import { User, Rules, Store } from '@/types';

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
