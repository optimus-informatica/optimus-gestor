<template>
  <form @submit.prevent="submit" :class="className">
    <div class="header">
      <span class="title">{{ title }}</span>
      <button
        type="button"
        class="material-icons"
        @click="$emit('hide', false)"
      >
        close
      </button>
    </div>
    <div class="content">
      <slot />
    </div>
    <div class="footer">
      <button type="button" @click="$emit('hide', false)">
        <span class="material-icons">close</span>
        <span class="text">Fechar</span>
      </button>
      <button type="submit">
        <span class="material-icons">{{ submitIcon }}</span>
        <span class="text">{{ submitText }}</span>
      </button>
    </div>
  </form>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    visible: Boolean,
    title: String,
    submit: Function,
    submitText: String,
    submitIcon: String,
  },
  emits: ['hide'],
  setup(props, ctx) {
    const default_submit = () => {
      ctx.emit('hide', false);
    };

    const className = computed(() => (props.visible ? 'modal show' : 'modal'));
    const submitIcon = computed(() =>
      props.submitIcon ? props.submitIcon : 'send',
    );
    const submitText = computed(() =>
      props.submitText ? props.submitText : 'Enviar',
    );
    const submit = computed(() =>
      typeof props.submit === 'function' ? props.submit : default_submit,
    );
    return { className, submitText, submitIcon, submit };
  },
});
</script>
