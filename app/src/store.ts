import { createStore } from 'vuex';
import { State, User } from '@/types';
import { state } from '@/defaults';

const store = createStore<State>({
  state: () => state(),

  mutations: {
    toggleSidebar: state => {
      state.sidebar = !state.sidebar;
    },
    setUser: (state, data: User) => {
      state.user = data;
    },
    setToken: (state, data: string) => {
      state.token = data;
      localStorage.setItem('_optimus_gestor_token', data);
    },
    setTitle: (state, data: string) => (state.title = data),
  },

  getters: {
    sidebar: state => state.sidebar,
    user: state => state.user,
    title: state => state.title,
  },
});

export default store;
