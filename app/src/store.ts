import { createStore } from 'vuex';
import { State } from '@/types';
import { state } from '@/defaults';

const store = createStore<State>({
  state: () => state(),

  mutations: {
    toggleSidebar: state => {
      state.sidebar = !state.sidebar;
    },
  },

  getters: {
    sidebar: state => state.sidebar,
  },
});

export default store;
