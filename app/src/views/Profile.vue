<template>
  <div class="profile">
    <form @submit.prevent="save" method="put">
      <form-field
        label="Nome:"
        type="text"
        v-model="data.name"
        name="name"
        id="name"
        :error="response.errors.name"
      />
      <form-field
        label="E-Mail:"
        type="text"
        v-model="data.email"
        name="email"
        id="email"
        :error="response.errors.email"
      />
      <form-field
        label="Usuário:"
        type="text"
        v-model="data.username"
        name="username"
        id="username"
        :editable="false"
      />
      <form-select
        label="Função:"
        v-model="data.role_id"
        name="role_id"
        id="role_id"
        :data="roles"
        :editable="false"
      />
      <form-field
        label="Nivel de acesso:"
        type="number"
        v-model="data.nivel"
        name="nivel"
        id="nivel"
        :editable="false"
      />
      <div class="line">
        <div class="title">Permissões:</div>
        <div class="rules">
          <div
            v-for="(permissions, name) in data.rules"
            :key="name"
            class="rule"
          >
            <span class="name">{{ translate[name] }}</span>
            <div class="permissions">
              <div
                v-for="(permission, i) in permissions"
                :key="i"
                class="permission"
              >
                <span class="material-icons">done</span>
                <span class="label">{{ translate[permission] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <span class="errors">{{ response.message }}</span>
        <button v-if="saved" type="submit">Salvar</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import FormField from '@/components/FormField.vue';
import FormSelect from '@/components/FormSelect.vue';
import { profileRequest, profileResponse, translates, http } from '@/defaults';
import { ProfileResponse, Role, State, User } from '@/types';
import { AxiosResponse } from 'axios';
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
  components: { FormField, FormSelect },
  name: 'Profile',
  setup() {
    const api = http();
    const { commit, getters } = useStore<State>();

    const data = reactive({
      data: profileRequest(getters.user),
      response: profileResponse(),
      roles: [] as Role[],
      translate: translates(),
    });

    onBeforeMount(async () => {
      try {
        const uri = `/api/role`;
        const response = await api.get<Role[]>(uri);
        data.roles = response.data;
      } catch (e: any) {}
    });

    onMounted(async () => {
      commit('setTitle', `Perfil de ${data.data.name}`);
    });

    //
    // Computed
    //
    const saved = computed(
      () =>
        JSON.stringify(data.data) !==
        JSON.stringify(profileRequest(getters.user)),
    );

    //
    // Methods
    //
    const save = async (_e: Event) => {
      const uri = `/api/user/${getters.user.id}`;
      try {
        const response = await api.put<User>(uri, data.data);
        commit('setUser', response.data);
        commit('setTitle', `Perfil de ${response.data.name}`);
      } catch (e: any) {
        if (typeof e === 'object') {
          const r = e.response as AxiosResponse<ProfileResponse>;
          data.response = r.data;
        }
      }
    };

    return { saved, save, ...toRefs(data) };
  },
});
</script>
