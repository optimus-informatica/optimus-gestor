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
  },

  getters: {
    sidebar: state => state.sidebar,
    user: state => state.user,
  },
});

export default store;
