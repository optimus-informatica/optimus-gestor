<template>
  <modal-form
    :title="'Editar informações de ' + user.name"
    :visible="visible"
    @hide="onHide"
    :submit="save"
    submitText="Salvar"
    submitIcon="save"
  >
    <loader :visible="loader" />
    <div class="form-edit-user">
      <div class="input">
        <label for="name">Nome:</label>
        <input type="text" name="name" id="name" v-model="user.name" required />
        <div v-if="response.errors.name" class="errors">
          {{ response.errors.name[0] }}
        </div>
      </div>
      <div class="input">
        <label for="username">Usuário:</label>
        <input
          type="text"
          name="username"
          id="username"
          v-model="user.username"
          required
        />
        <div v-if="response.errors.username" class="errors">
          {{ response.errors.username[0] }}
        </div>
      </div>
      <div class="input">
        <label for="email">E-mail:</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="user.email"
          required
        />
        <span v-if="response.errors.email" class="errors">{{
          response.errors.email[0]
        }}</span>
      </div>
      <div class="input">
        <label for="role_id">Função:</label>
        <select name="role_id" id="role_id" v-model="user.role_id" required>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name.toUpperCase() }}
          </option>
        </select>
        <div v-if="response.errors.role_id" class="errors">
          {{ response.errors.role_id[0] }}
        </div>
      </div>
      <div class="input">
        <label for="nivel">Nivel de acesso:</label>
        <input
          type="number"
          name="nivel"
          id="nivel"
          v-model="user.nivel"
          required
        />
        <span class="errors"></span>
        <div v-if="response.errors.nivel" class="errors">
          {{ response.errors.nivel[0] }}
        </div>
      </div>
      <div class="input">
        <label for="rules">Permissões:</label>
        <div class="rules">
          <div class="rule" v-for="session in sessions" :key="session">
            <div class="name">{{ translate[session] }}</div>
            <div class="boxs">
              <div class="box" v-for="(permission, k) in permissions" :key="k">
                <input
                  type="checkbox"
                  :id="session + permission"
                  :value="permission"
                  v-model="user.rules[session]"
                />
                <label :for="session + permission">{{
                  translate[permission]
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="response.errors.rules" class="errors">
          {{ response.errors.rules[0] }}
        </div>
      </div>
      <div v-if="response.message" class="errors">{{ response.message }}</div>
      <div v-if="response.success" class="success">{{ response.success }}</div>
    </div>
  </modal-form>
</template>
<script lang="ts">
import { http, permissions, sessions, translates, user } from '@/defaults';
import { Role, User } from '@/types';
import { AxiosResponse } from 'axios';
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  toRefs,
} from 'vue';
import Loader from './Loader.vue';
import ModalForm from './ModalForm.vue';

interface ErrorResponse {
  message: string;
  errors: {
    name?: string[];
    username?: string[];
    email?: string[];
    role_id?: string[];
    nivel?: string[];
    rules?: string[];
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
      translate: translates(),
      sessions: sessions(),
      permissions: permissions(),
      loader: false,
      roles: [] as Role[],
      response: { message: '', success: '', errors: {} },
    });

    onMounted(async () => {
      console.log('mounted');
      data.response = { message: '', success: '', errors: {} };
      try {
        const res = await api.get<Role[]>('api/role');
        data.roles = res.data;
      } catch (e: any) {
        if (e.response) {
          const res = e.response as AxiosResponse<ErrorResponse>;
          data.response.message = `O servidor respondeu com o erro: ${res.status}`;
        }
      }
    });

    const visible = computed(() => props.visible);
    const user = computed(() => props.data);

    const save = async () => {
      data.loader = true;
      const uri = `api/user/${user.value.id}`;
      try {
        const res = await api.put(uri, user.value);
        ctx.emit('success', res.data);
        data.response.success = 'Alterações salvas com sucesso!';
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

    return { ...toRefs(data), visible, user, save, onHide };
  },
});
</script>
