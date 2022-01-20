<template>
  <nav :class="className">
    <ul class="menu">
      <li class="arrow">
        <button type="button" @click="toggleSidebar">
          <i class="material-icons">{{ icon }}</i>
        </button>
      </li>
      <li class="item">
        <router-link to="/" title="Home">
          <i class="material-icons">dashboard</i>
        </router-link>
      </li>
      <li class="item">
        <button data-icon="manage_accounts" title="Usuários">
          <i class="material-icons">manage_accounts</i>
        </button>
        <ul class="submenu">
          <li class="subitem">
            <router-link to="#users">Novo usuário</router-link>
          </li>
          <li class="subitem">
            <router-link to="/users">Usuários registrados</router-link>
          </li>
          <li class="subitem">
            <router-link to="/users">Permissões de usuários</router-link>
          </li>
        </ul>
      </li>
      <li class="item">
        <button type="button" title="Clientes">
          <i class="material-icons">supervised_user_circle</i>
        </button>
        <ul class="submenu">
          <li class="subitem">
            <router-link to="/clients">Novo cliente</router-link>
          </li>
          <li class="subitem">
            <router-link to="/clients">Clientes registrados</router-link>
          </li>
        </ul>
      </li>
      <li class="item">
        <router-link to="/" title="Serviços">
          <i class="material-icons">work</i>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/" title="Produtos">
          <i class="material-icons">shopping_basket</i>
        </router-link>
      </li>
      <li class="item">
        <router-link to="/" title="Ordens de serviço">
          <i class="material-icons">shopping_cart_checkout</i>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { State } from '@/types';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const { commit, getters } = useStore<State>();

    //
    // Methods
    //
    const toggleSidebar = () => {
      commit('toggleSidebar');
    };

    //
    // Computeds
    //
    const className = computed<string>(() =>
      getters.sidebar ? 'sidebar show' : 'sidebar',
    );

    const icon = computed((): string =>
      getters.sidebar ? 'arrow_back_ios' : 'menu',
    );

    return { toggleSidebar, className, icon };
  },
});
</script>
