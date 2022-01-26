<template>
  <div :class="className">
    Carregando
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'Loader',
  props: {
    visible: Boolean,
  },
  setup(props) {
    const className = computed(() =>
      props.visible ? 'loader show' : 'loader',
    );
    return { className };
  },
});
</script>
