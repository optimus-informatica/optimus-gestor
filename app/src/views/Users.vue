<template>
  <div class="users">
    <loader :visible="loader" />
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
          <div class="col role">{{ user.role.name }}</div>
          <div class="col">{{ user.nivel }}</div>
          <div class="col">
            <button
              type="button"
              @click="handle.edit(i)"
              :disabled="disabled(i)"
            >
              <span class="material-icons">edit</span>
            </button>
            <button
              type="button"
              @click="handle.password(i)"
              :disabled="disabled(i)"
            >
              <span class="material-icons">lock</span>
            </button>
            <button
              type="button"
              @click="handle.delete(i)"
              :disabled="disabled(i)"
            >
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <modal-edit-user
      :visible="edit"
      :data="user"
      @toggle="toggle.edit"
      @success="success.edit"
    />
    <modal-change-password
      :visible="password"
      :data="user"
      @toggle="toggle.password"
      @success="success.password"
    />
  </div>
</template>
<script lang="ts">
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';
import ModalChangePassword from '@/components/ModalChangePassword.vue';
import ModalEditUser from '@/components/ModalEditUser.vue';
import { http, translates, user } from '@/defaults';
import { State, User } from '@/types';
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  reactive,
  toRefs,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  components: { Modal, Loader, ModalEditUser, ModalChangePassword },
  setup() {
    const api = http();
    const { commit, state } = useStore<State>();
    const auth = computed(() => state.user);

    onBeforeMount(async () => {
      const res = await api.get<User[]>('/api/user');
      data.users = res.data;
      commit('setTitle', 'Usuários');
    });

    onMounted(() => {
      data.loader = false;
    });

    const data = reactive({
      users: [] as User[],
      roles: {},
      user: user(),
      edit: false,
      password: false,
      delete: false,
      loader: true,
    });

    const toggle = {
      edit(payload: boolean) {
        data.edit = payload;
      },
      password(payload: boolean) {
        data.password = payload;
      },
      delete(payload: boolean) {
        data.delete = payload;
      },
    };

    const handle = {
      edit(i: number) {
        data.edit = true;
        data.user = data.users[i];
      },
      password(i: number) {
        data.password = true;
        data.user = data.users[i];
      },
      delete(i: number) {
        data.delete = true;
        data.user = data.users[i];
      },
    };

    const success = {
      edit(payload: User) {
        data.user = payload;
      },
      password(payload: User) {
        data.user = payload;
      },
      delete(payload: User) {
        data.user = payload;
      },
    };

    const disabled = (i: number) => {
      if (data.users[i].role_id === 1 && data.users[i].id !== auth.value.id)
        return true;
      return auth.value.nivel < data.users[i].nivel;
    };

    return {
      ...toRefs(data),
      toggle,
      handle,
      success,
      translate: translates(),
      disabled,
    };
  },
});
</script>
