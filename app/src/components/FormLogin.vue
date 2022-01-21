<template>
  <form @submit.prevent="login" method="post">
    <div class="input">
      <label for="username">Usuário:</label>
      <input
        v-model="data.username"
        type="text"
        name="username"
        id="username"
      />
      <div v-if="res.errors.username" class="errors">
        {{ res.errors.username[0] }}
      </div>
    </div>
    <div class="input">
      <label for="password">Senha:</label>
      <input
        v-model="data.password"
        type="password"
        name="password"
        id="password"
      />
      <div v-if="res.errors.password" class="errors">
        {{ res.errors.password[0] }}
      </div>
    </div>
    <div class="footer">
      <div v-if="res.message" class="errors">{{ res.message }}</div>
      <button type="submit">Entrar</button>
    </div>
  </form>
</template>
<script lang="ts">
import { LoginResponse, User, State } from '@/types';
import { AxiosInstance, AxiosResponse } from 'axios';
import { defineComponent, inject, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    loginSuccess: {
      type: Function,
      default: (payload: User) => payload,
    },
  },

  setup(props, _context) {
    const http = inject<AxiosInstance>('axios');
    const { commit } = useStore<State>();
    const device = navigator.userAgent;

    // Reactives
    const data = ref({ username: '', password: '', device });
    const res = ref<LoginResponse>({ message: ' ', errors: {} });

    // Methods
    const login = async (_e: Event) => {
      res.value = { message: 'Aguarde...', errors: {} };
      if (!http) return;
      try {
        await http.get('/sanctum/csrf-cookie');
        const response = await http.post<User>('/api/login', data.value);
        commit('setUser', response.data);
        props.loginSuccess(response.data);
      } catch (e: any) {
        if (typeof e === 'object') {
          if (e.response) {
            const response = e.response as AxiosResponse<LoginResponse>;
            res.value = response.data;
          } else console.error(e);
        }
      }
    };

    return { data, res, login };
  },
});
</script>
