<template>
  <div :class="className">
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
      <button type="button" @click="ok">
        <span class="material-icons">{{ okIcon }}</span>
        <span class="text">{{ okText }}</span>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    visible: Boolean,
    title: String,
    ok: Function,
    okText: String,
    okIcon: String,
  },
  emits: ['hide'],
  setup(props, ctx) {
    const default_ok = () => {
      ctx.emit('hide', false);
    };

    console.log(typeof props.ok);

    const className = computed(() => (props.visible ? 'modal show' : 'modal'));
    const okIcon = computed(() => (props.okIcon ? props.okIcon : 'check'));
    const okText = computed(() => (props.okText ? props.okText : 'Ok'));
    const ok = computed(() =>
      typeof props.ok === 'function' ? props.ok : default_ok,
    );
    return { className, okText, okIcon, ok };
  },
});
</script>
