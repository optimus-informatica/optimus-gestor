import { createStore } from 'vuex';
import { Store } from '@/types';

const store = createStore<Store>({
  state: () => ({
    sidebar: false,
  }),
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
