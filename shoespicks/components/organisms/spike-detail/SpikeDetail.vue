<template>
  <article class="organisms-spike-detail">
    <v-container>
      <SpikeDetailTop
        :spike="spike"
        :is-favorite.sync="isFavorite"
        :have.sync="have"
        :reviewed.sync="reviewed"
      ></SpikeDetailTop>
    </v-container>
    <v-container>
      <v-tabs v-model="selectedTab" :height="60" grow>
        <v-tab :ripple="false">Top</v-tab>
        <v-tab :ripple="false">スペック情報</v-tab>
        <v-tab :ripple="false">クチコミ</v-tab>
      </v-tabs>
    </v-container>
    <v-tabs-items v-model="selectedTab">
      <v-tab-item>
        <SpikeDetailIntroductionTab :spike="spike"></SpikeDetailIntroductionTab>
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
import SpikeDetailIntroductionTab from '~/components/organisms/spike-detail/SpikeDetailIntroductionTab.vue';
import SpikeDetailTop from '~/components/organisms/spike-detail/SpikeDetailTop.vue';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { SpikeDetailIntroductionTab, SpikeDetailTop },
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
}
</style>
