<template>
  <div class="form-field">
    <label :for="$attrs.id" @click="toggleEdit()">
      <span v-if="$props.editable" class="material-icons">edit</span>
      {{ $attrs.label }}
    </label>
    <div class="data">
      <select v-if="editable" v-bind="$attrs" @input="onInput">
        <option
          v-for="(item, i) in $props.data"
          :value="item.id"
          :key="i"
          :selected="selected(item.id)"
        >
          {{ item.name }}
        </option>
      </select>
      <span v-else>
        {{ selectText(parseInt($attrs.modelValue)) }}
      </span>
    </div>
    <div v-if="$props.error[0]" class="errors">{{ $props.error[0] }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Role } from '@/types';

export default defineComponent({
  name: 'FormField',
  props: {
    editable: {
      type: Boolean,
      default: () => true,
    },
    data: {
      type: Array as PropType<Role[]>,
      default: () => [],
    },
    error: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, context) {
    const editable = ref(props.editable);

    //
    // Methods
    //
    const onInput = (e: Event) => {
      const value = (e.target as HTMLInputElement).value;
      context.emit('update:modelValue', value);
      return value;
    };

    const toggleEdit = (_e: Event) => {
      editable.value = props.editable ? !editable.value : false;
    };

    const selectText = (id: number) => {
      const arr = props.data.filter(item => item.id === id);
      return arr[0] ? arr[0].name : '';
    };

    const selected = (id: number) => {
      const value = context.attrs.modelValue;
      let nValue = 0;
      if (typeof value === 'string') nValue = parseInt(value);
      else if (typeof value === 'number') nValue = value;
      return nValue === id;
    };

    return { onInput, toggleEdit, editable, selectText, selected };
  },
});
</script>
