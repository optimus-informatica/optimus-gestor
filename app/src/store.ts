import { createStore } from 'vuex';
import { Store } from '@/types';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const store = createStore<Store>({
  state: () => ({
    sidebar: false,
    axios,
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
