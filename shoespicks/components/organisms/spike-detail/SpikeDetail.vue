<template>
  <article class="organisms-spike-detail">
    <SpikeDetailTop
      :spike="spike"
      :is-favorite.sync="isFavorite"
      :have.sync="have"
      :reviewed.sync="reviewed"
    ></SpikeDetailTop>
    <section>
      <div
        v-if="spike.keyFeatures"
        v-html="$md.render(spike.keyFeatures)"
      ></div>
      <div
        v-if="spike.athletesInterview"
        v-html="$md.render(spike.athletesInterview)"
      ></div>
    </section>
  </article>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';
import SpikeDetailTop from '~/components/organisms/spike-detail/SpikeDetailTop.vue';
import { ISpikeModel } from '~/store/model/spike';

export default defineComponent({
  components: { SpikeDetailTop },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    }
  },
  setup() {
    return {
      isFavorite: ref<number>(),
      have: ref<number>(),
      reviewed: ref<number>()
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-spike-detail {
}
</style>
