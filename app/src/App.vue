<template>
  <header>
    <appbar />
    <sidebar />
  </header>
  <main :class="className">
    <router-view />
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Appbar from './components/Appbar.vue';
import Sidebar from './components/Sidebar.vue';
import { State } from './types';

export default defineComponent({
  components: { Appbar, Sidebar },
  name: 'App',
  provide: {},
  setup() {
    const { getters } = useStore<State>();
    const className = computed(() => (getters.sidebar ? 'main show' : 'main'));
    return { className };
  },
});
</script>
