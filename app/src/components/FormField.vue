<template>
  <div class="form-field">
    <label :for="$attrs.id" @click="toggleEdit()">
      <span v-if="$props.editable" class="material-icons">edit</span>
      {{ $attrs.label }}
    </label>
    <div class="data">
      <input
        v-if="editable"
        v-bind="$attrs"
        @input="onInput"
        :value="$attrs.modelValue"
      />
      <span v-else>
        {{ $attrs.modelValue }}
      </span>
    </div>
    <div v-if="$props.error[0]" class="errors">{{ $props.error[0] }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FormField',
  props: {
    editable: {
      type: Boolean,
      default: () => true,
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
    return { onInput, toggleEdit, editable };
  },
});
</script>
