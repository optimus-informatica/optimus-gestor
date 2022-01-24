import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw,
} from 'vue-router';
import { AxiosResponse } from 'axios';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';

import { http } from '@/defaults';
import { User } from '@/types';
import store from '@/store';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

interface LoggedIn {
  name: string;
  logged: boolean;
}

/**
 * Comunicação com o back-end
 * Verifica se o usuário está logado
 * @param to RouteLocationNormalized
 * @returns Promise<LoggedIn>
 */
const isLoggedIn = async (to: RouteLocationNormalized): Promise<LoggedIn> => {
  const axios = http();
  const data = { name: 'home', logged: false };
  try {
    const response = await axios.get<User>('/api/me');
    store.commit('setUser', response.data);
    data.name = to.name ? to.name.toString() : 'home';
    data.logged = true;
  } catch (e: any) {
    if (typeof e.response !== 'object') data.name = 'error-network';
    else {
      const response = e.response as AxiosResponse<{ message: string }>;
      if (response.status === 401) data.name = 'login';
      else if (response.status === 404) data.name = 'Error404';
      else data.name = 'Error500';
    }
  }
  return data;
};

/**
 *
 * Middleware para verificar se o usuário está autenticado
 * @param to RouteLocationNormalized
 * @param _from RouteLocationNormalized
 * @param next NavigationGuardNext
 */
const middlewareGuard = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  if (to.name === 'login') return next();
  const { name, logged } = await isLoggedIn(to);
  if (!logged) return next({ name });
  next();
};

router.beforeEach(middlewareGuard);

export default router;
