<template>
  <div class="users">
    <div class="table-users">
      <div class="header">
        <div class="col">#</div>
        <div class="col">Nome</div>
        <div class="col">Usuário</div>
        <div class="col">E-Mail</div>
        <div class="col">Função</div>
        <div class="col">Nivel</div>
        <div class="col"></div>
      </div>
      <div class="content">
        <div class="line" v-for="(user, i) in users" :key="user.id">
          <div class="col">{{ user.id }}</div>
          <div class="col">{{ user.name }}</div>
          <div class="col">{{ user.username }}</div>
          <div class="col">{{ user.email }}</div>
          <div class="col role" v-if="roles[user.role_id]">
            {{ roles[user.role_id].name }}
          </div>
          <div class="col">{{ user.nivel }}</div>
          <div class="col">
            <button type="button" @click="editHandle(i)">
              <span class="material-icons">edit</span>
            </button>
            <button type="button" @click="changeHandle">
              <span class="material-icons">lock</span>
            </button>
            <button type="button" @click="deleteHandle">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal
      title="Editar usuário"
      :visible="visible"
      @hide="hide"
      :ok="saveEditHandle"
      okText="Salvar"
      okIcon="save"
    >
      <div class="form-edit-user">
        <form action="" method="post">
          <div class="input">
            <label for="name">Nome:</label>
            <input type="text" name="name" id="name" v-model="user.name" />
            <span class="errors"></span>
          </div>
          <div class="input">
            <label for="username">Usuário:</label>
            <input
              type="text"
              name="username"
              id="username"
              v-model="user.username"
            />
            <span class="errors"></span>
          </div>
          <div class="input">
            <label for="email">E-mail:</label>
            <input type="email" name="email" id="email" v-model="user.email" />
            <span class="errors"></span>
          </div>
          <div class="input">
            <label for="role_id">Função:</label>
            <select name="role_id" id="role_id" v-model="user.role_id">
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name.toUpperCase() }}
              </option>
            </select>
            <span class="errors"></span>
          </div>
        </form>
      </div>
    </modal>
    {{ visible }}
  </div>
</template>
<script lang="ts">
import Modal from '@/components/Modal.vue';
import { http, user } from '@/defaults';
import { Role, State, User } from '@/types';
import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: { Modal },
  setup() {
    const api = http();
    const { commit } = useStore<State>();
    onBeforeMount(async () => {
      const resUsers = await api.get<User[]>('/api/user');
      data.users = resUsers.data;

      const resRoles = await api.get<Role[]>('api/role');
      const roles = resRoles.data;
      for (let i = 0; i < roles.length; i++) {
        Object.assign(data.roles, { [roles[i].id]: roles[i] });
      }

      commit('setTitle', 'Usuários');
    });

    const data = reactive({
      users: [] as User[],
      roles: {},
      visible: false,
      user: user(),
    });

    const hide = (payload: boolean) => {
      console.log('HIDE: ', payload);
      data.visible = payload;
    };

    const editHandle = (i: number) => {
      data.visible = !data.visible;
      data.user = data.users[i];
    };

    const saveEditHandle = () => {
      console.log('SAVE EDIT: ', data.user.id);
    };
    const deleteHandle = () => {};
    const changeHandle = () => {};

    return {
      ...toRefs(data),
      hide,
      editHandle,
      saveEditHandle,
      deleteHandle,
      changeHandle,
    };
  },
});
</script>
