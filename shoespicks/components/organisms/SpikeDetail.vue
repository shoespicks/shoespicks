<template>
  <article v-if="spike" class="organisms-spike-detail">
    <section>
      <h1>
        <span> {{ spike.nameEn }} </span>
        <small> {{ spike.name }}</small>
      </h1>
      <v-carousel v-if="spike.colorVariations">
        <v-carousel-item
          v-for="imageUrl in selectedColor.imageUrls"
          :key="imageUrl"
        >
          <v-img :src="imageUrl"></v-img>
        </v-carousel-item>
      </v-carousel>
      <ColorVariationsPicker
        v-model="selectedColor"
        :items="spike.colorVariations"
        large
        class="color-variations-picker"
      ></ColorVariationsPicker>
      <p>
        {{ spike.description }}
      </p>
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
import ColorVariationsPicker from '~/components/molecules/ColorVariationsPicker.vue';
import { ISpikeModel } from '~/store/model/spikeModel';

export default defineComponent({
  components: { ColorVariationsPicker },
  props: {
    spike: {
      type: Object as PropType<ISpikeModel>,
      required: true
    }
  },
  setup(props) {
    const selectedColor = ref(props.spike.colorVariations[0]);

    return {
      selectedColor
    };
  }
});
</script>
<style lang="scss" scoped>
.organisms-spike-detail {
  h1 {
    display: flex;
    flex-direction: column;
    font-family: 'marsek', 'Noto Sans JP', 'Roboto', sans-serif;
    font-size: 40px;

    > * {
      display: inline-flex;
    }

    > small {
      margin-top: -8px;
      font-size: 24px;
    }
  }

  .color-variations-picker {
    margin: 16px 0;
  }
}
</style>
