<template>
  <header>
    <appbar />
    <sidebar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Appbar from './components/Appbar.vue';
import Sidebar from './components/Sidebar.vue';

export default defineComponent({
  components: { Appbar, Sidebar },
  name: 'App',
});
</script>
