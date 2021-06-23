<template>
  <div class="molecules-sticky-sidemav-layout">
    <div class="content-container">
      <slot></slot>
    </div>
    <div class="sidemav-container">
      <slot name="sidenav"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';

export default defineComponent({
  props: {},
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scoped>
.molecules-sticky-sidemav-layout {
  position: relative;
}
</style>
