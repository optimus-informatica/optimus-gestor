<template>
  <div :class="className">
    <div class="title">Home</div>
    <ul class="user">
      <li class="item">
        <router-link to="/profile" title="Configurações da conta">
          <i class="material-icons">account_circle</i>
        </router-link>
      </li>
      <li class="item">
        <button type="button" title="Sair">
          <i class="material-icons">logout</i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { State } from '@/types';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    //
    // Store
    //
    const { getters } = useStore<State>();

    //
    // Computeds
    //
    const className = computed<string>(() =>
      getters.sidebar ? 'appbar show' : 'appbar',
    );

    return { className };
  },
});
</script>
