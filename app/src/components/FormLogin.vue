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
      <div v-if="response.errors.username" class="errors">
        {{ response.errors.username[0] }}
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
      <div v-if="response.errors.password" class="errors">
        {{ response.errors.password[0] }}
      </div>
    </div>
    <div class="footer">
      <div v-if="response.message" class="errors">{{ response.message }}</div>
      <button type="submit">Entrar</button>
    </div>
  </form>
</template>
<script lang="ts">
import { LoginResponse, User, State } from '@/types';
import { AxiosResponse } from 'axios';
import { defineComponent, inject, reactive, toRefs } from 'vue';
import { http } from '@/defaults';
import { useStore } from 'vuex';

interface Response {
  user: User;
  token: string;
}

export default defineComponent({
  props: {
    loginSuccess: {
      type: Function,
      default: (payload: User) => payload,
    },
  },

  setup(props, _context) {
    const api = http();
    const { commit } = useStore<State>();

    // Reactives
    const r = reactive({
      data: { username: '', passwrod: '', device: navigator.userAgent },
      response: { message: ' ', errors: {} },
    });

    // Methods
    const login = async (_e: Event) => {
      r.response = { message: 'Aguarde...', errors: {} };
      try {
        const response = await api.post<Response>('api/authenticate', r.data);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        props.loginSuccess(response.data);
      } catch (e: any) {
        if (typeof e === 'object') {
          if (e.response) {
            const response = e.response as AxiosResponse<LoginResponse>;
            r.response = response.data;
          } else console.error(e);
        }
      }
    };

    return { ...toRefs(r), login };
  },
});
</script>
