<template>
  <modal-form
    :title="'Definir senha para ' + user.name"
    :visible="visible"
    @hide="onHide"
    :submit="save"
    submitText="Salvar"
    submitIcon="save"
  >
    <loader :visible="loader" />
    <div class="form-change-password">
      <div v-if="isAdmin" class="input">
        <label for="current_password">Senha antiga:</label>
        <input
          type="password"
          name="current_password"
          id="current_password"
          v-model="data.current_password"
          required
        />
        <div v-if="response.errors.password" class="errors">
          {{ response.errors.password[0] }}
        </div>
      </div>
      <div class="input">
        <label for="password">Senha nova:</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="data.password"
          required
        />
        <div v-if="response.errors.password" class="errors">
          {{ response.errors.password[0] }}
        </div>
      </div>
      <div class="input">
        <label for="password_confirmation">Repita a senha:</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          v-model="data.password_confirmation"
          required
        />
        <div v-if="response.errors.password" class="errors">
          {{ response.errors.password[0] }}
        </div>
      </div>
    </div>
    <div v-if="response.message" class="errors">{{ response.message }}</div>
    <div v-if="response.success" class="success">{{ response.success }}</div>
  </modal-form>
</template>
<script lang="ts">
import { http, user } from '@/defaults';
import { User } from '@/types';
import { AxiosResponse } from 'axios';
import { computed, defineComponent, PropType, reactive, toRefs } from 'vue';
import Loader from './Loader.vue';
import ModalForm from './ModalForm.vue';

interface ErrorResponse {
  message: string;
  errors: {
    password?: string[];
  };
}

export default defineComponent({
  components: { Loader, ModalForm },
  name: 'ModalEditUser',
  emits: ['toggle', 'success'],
  props: {
    visible: Boolean,
    data: { type: Object as PropType<User>, default: user() },
  },
  setup(props, ctx) {
    const api = http();

    const data = reactive({
      loader: false,
      response: { message: '', success: '', errors: {} },
      data: { password: '', password_confirmation: '' },
    });

    const visible = computed(() => props.visible);
    const user = computed(() => props.data);
    const isAdmin = computed(() => props.data.role_id === 1);

    const save = async () => {
      data.response = { message: '', success: '', errors: {} };
      data.loader = true;
      const uri = `api/password/${user.value.id}`;
      try {
        const res = await api.put(uri, data.data);
        ctx.emit('success', res.data);
        data.response.success = 'Senha alterada com sucesso.';
        data.data = { password: '', password_confirmation: '' };
      } catch (e: any) {
        if (e.response) {
          const res = e.response as AxiosResponse<ErrorResponse>;
          if (res.status === 422) Object.assign(data.response, res.data);
          else
            data.response.message = `O servidor respondeu com o erro: ${res.status}`;
        }
      }
      data.loader = false;
    };

    const onHide = () => {
      data.response = { message: '', success: '', errors: {} };
      ctx.emit('toggle', false);
    };

    return { ...toRefs(data), visible, user, isAdmin, save, onHide };
  },
});
</script>
