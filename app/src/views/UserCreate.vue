<template>
  <div class="user-create">
    <form @submit.prevent="save" action="">
      <div class="input">
        <label for="name">Nome:</label>
        <input type="text" name="name" id="name" v-model="data.name" required />
        <div v-if="res.errors.name" class="errors">
          {{ res.errors.name[0] }}
        </div>
      </div>
      <div class="input">
        <label for="username">Usuário:</label>
        <input
          type="text"
          name="username"
          id="username"
          v-model="data.username"
          required
        />
        <div v-if="res.errors.username" class="errors">
          {{ res.errors.username[0] }}
        </div>
      </div>
      <div class="input">
        <label for="email">E-mail:</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="data.email"
          required
        />
        <div v-if="res.errors.email" class="errors">
          {{ res.errors.email[0] }}
        </div>
      </div>
      <div class="input">
        <label for="password">Senha:</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="data.password"
          required
        />
        <div v-if="res.errors.password" class="errors">
          {{ res.errors.password[0] }}
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
        <div v-if="res.errors.password" class="errors">
          {{ res.errors.password[0] }}
        </div>
      </div>
      <div class="input">
        <label for="role_id">Função:</label>
        <select
          name="role_id"
          id="role_id"
          v-model="data.role_id"
          @input="onInput"
          required
        >
          <option
            v-for="role in roles"
            :value="role.id"
            :key="role.id"
            :disabled="role.id === 1"
          >
            {{ role.name }}
          </option>
        </select>
        <div v-if="res.errors.role_id" class="errors">
          {{ res.errors.role_id[0] }}
        </div>
      </div>
      <div class="input">
        <label for="nivel">Nivel de acesso:</label>
        <input
          type="number"
          name="nivel"
          id="nivel"
          v-model="data.nivel"
          :max="nivelMax"
          :min="0"
          required
        />
        <div v-if="res.errors.nivel" class="errors">
          {{ res.errors.nivel[0] }}
        </div>
      </div>
      <div class="input">
        <label for="rules">Permissões:</label>
        <div class="rules">
          <div class="rule" v-for="(rule, name) in role.rules" :key="name">
            <div class="name">{{ translate[name] }}</div>
            <div class="boxs">
              <div class="box" v-for="(permission, k) in permissions" :key="k">
                <input
                  type="checkbox"
                  :id="name + permission"
                  :value="permission"
                  v-model="data.rules[name]"
                />
                <label :for="name + permission">{{
                  translate[permission]
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="res.errors.rules" class="errors">
          {{ res.errors.rules[0] }}
        </div>
      </div>
      <div class="footer">
        {{ res.message }}
        &nbsp;
        <button type="submit">Registrar</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Role, State, User } from '@/types';
import { http, role as def_role, translates, rules } from '@/defaults';
import {
  computed,
  defineComponent,
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';
import { useStore } from 'vuex';
import { AxiosResponse } from 'axios';

interface ErrorResponse {
  message: string;
  errors: {
    name?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
    role_id?: string[];
    nivel?: string[];
    rules?: string[];
  };
}

export default defineComponent({
  setup() {
    const api = http();
    const { state } = useStore<State>();
    const user = state.user;
    const permissions = ['create', 'delete', 'update', 'read'];

    // Reactives
    const data = reactive({
      data: {
        name: '',
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
        role_id: 0,
        nivel: 0,
        rules: rules(),
      },
      roles: [] as Role[],
      roleIndex: -1,
      res: { message: '', errors: {} } as ErrorResponse,
    });

    onBeforeMount(async () => {
      // Consulta na API as roles registradas.
      try {
        const res = await api.get<Role[]>('api/role');
        data.roles = res.data;
      } catch (_e: any) {}
    });

    //
    // Computeds
    //
    // Nivel maximo que o usuário atual pode atribuir ao novo usuário
    const nivelMax = computed(() => (user.nivel < 100 ? user.nivel : 99));
    // Recupera a informações da role selecionada.
    const role = computed(() => {
      let r = def_role();
      if (data.roleIndex >= 0) r = data.roles[data.roleIndex];
      data.data.nivel = r.nivel;
      data.data.rules = r.rules;
      return r;
    });

    // Methods
    const onInput = (e: Event) => {
      const select = e.target as HTMLSelectElement;
      data.roleIndex = select.selectedIndex;
    };

    const save = async (e: Event) => {
      data.res = { message: 'aguarde ...', errors: {} };
      try {
        const res = await api.post<User>('api/user', data.data);
        data.res.message = 'Usuário registrado com sucesso!';
        console.log(res.data);
      } catch (e: any) {
        if (typeof e === 'object') {
          if (e.response) {
            const res = e.response as AxiosResponse<ErrorResponse>;
            if (res.status === 422) data.res = res.data;
            else
              data.res.message = `O servidor respondeu com o erro: ${res.status}`;
          }
        }
      }
    };

    return {
      // constantes
      translate: translates(),
      permissions,
      // computeds
      nivelMax,
      role,
      // reactives
      ...toRefs(data),
      // methods
      onInput,
      save,
    };
  },
});
</script>
