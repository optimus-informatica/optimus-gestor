<template>
  <div class="login">
    <div class="form-login">
      <form-login :loginSuccess="loginSuccess" />
    </div>
  </div>
</template>
<script lang="ts">
import FormLogin from '@/components/FormLogin.vue';
import { State, User } from '@/types';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Login',
  components: {
    FormLogin,
  },
  setup() {
    const router = useRouter();
    const { commit } = useStore<State>();
    const loginSuccess = (_payload: User) => {
      router.push({ name: 'home' });
    };
    onMounted(() => commit('setTitle', 'Login'));
    return { loginSuccess };
  },
});
</script>
