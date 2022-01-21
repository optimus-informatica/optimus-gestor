<template>
  <div class="login">
    <div class="form-login">
      <form-login :loginSuccess="loginSuccess" />
    </div>
  </div>
</template>
<script lang="ts">
import FormLogin from '@/components/FormLogin.vue';
import { User } from '@/types';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  components: {
    FormLogin,
  },
  setup() {
    const router = useRouter();
    const loginSuccess = (_payload: User) => {
      router.push({ name: 'home' });
    };
    return { loginSuccess };
  },
});
</script>
