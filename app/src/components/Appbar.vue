<template>
  <div :class="className">
    <div class="title">Home</div>
    <ul class="user" v-if="logged">
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
import { State, User } from '@/types';
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
    const logged = computed<boolean>(() => getters.user.id > 0);

    return { className, logged };
  },
});
</script>
