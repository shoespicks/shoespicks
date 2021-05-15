<template>
  <v-app class="app-default-layout">
    <Header :height="160" image-path="/images/top/heroimage.png">
      <template #imgContent>
        <section class="default-layout-heroimage-logo-container">
          <h2>陸上競技者のためのシューズ検索サイト</h2>
          <img
            width="60"
            height="60"
            src="/images/logo/logo-square.svg"
            alt="shoespicks"
          />
        </section>
      </template>
    </Header>
    <main class="app-default-layout-content">
      <Nuxt />
    </main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';

import Footer from '~/components/organisms/Footer.vue';
import Header from '~/components/organisms/Header.vue';

export default defineComponent({
  components: {
    Header,
    Footer
  },
  setup() {}
});
</script>

<style lang="scss" scoped>
.app-default-layout {
  ::v-deep .default-layout-heroimage-logo-container {
    position: absolute;
    display: flex;
    left: 50%;
    top: 50px;
    transform: translateX(-50%);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;

    > * {
      + * {
        margin-top: 8px;
      }
    }

    h2 {
      font-size: 16px;
    }
  }

  main.app-default-layout-content {
    margin-top: 160px;
  }
}
</style>
