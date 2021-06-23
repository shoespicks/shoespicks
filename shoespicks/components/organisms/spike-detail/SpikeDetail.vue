<template>
  <article class="organisms-spike-detail">
    <Container>
      <SpikeDetailTop
        :spike="spike"
        :is-favorite.sync="isFavorite"
        :have.sync="have"
        :reviewed.sync="reviewed"
      ></SpikeDetailTop>
    </Container>
    <div class="spike-detail-tab">
      <Container>
        <v-tabs v-model="selectedTab" color="#262626" :height="60" grow>
          <v-tab :ripple="false">Top</v-tab>
          <v-tab :ripple="false">スペック情報</v-tab>
          <v-tab :ripple="false">クチコミ</v-tab>
        </v-tabs>
      </Container>
    </div>
    <v-tabs-items v-model="selectedTab">
      <v-tab-item>
        <StickySidenavLayout>
          <SpikeDetailIntroductionTab
            :spike="spike"
          ></SpikeDetailIntroductionTab>
        </StickySidenavLayout>
      </v-tab-item>
      <v-tab-item>
        スペック
      </v-tab-item>
      <v-tab-item>
        クチコミ
      </v-tab-item>
    </v-tabs-items>
  </article>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import Container from '~/components/atoms/Container.vue';
import StickySidenavLayout from '~/components/molecules/layout/StickySidenavLayout.vue';
import SpikeDetailIntroductionTab from '~/components/organisms/spike-detail/SpikeDetailIntroductionTab.vue';
import SpikeDetailTop from '~/components/organisms/spike-detail/SpikeDetailTop.vue';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: {
    Container,
    StickySidenavLayout,
    SpikeDetailIntroductionTab,
    SpikeDetailTop
  },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      default: null
    }
  },
  setup() {
    return {
      isFavorite: ref<number>(),
      have: ref<number>(),
      reviewed: ref<number>(),
      selectedTab: ref<any>()
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-spike-detail {
  > .container {
    + .container {
      margin-top: 80px;
    }
  }

  .spike-detail-tab {
    position: sticky;
    top: 48px;
    z-index: 10;
    background-color: #ffffff;
  }
}
</style>
