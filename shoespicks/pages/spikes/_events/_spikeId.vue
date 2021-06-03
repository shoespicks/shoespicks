<template>
  <div class="page-content">
    <v-breadcrumbs :items="items"></v-breadcrumbs>
    <SpikeDetail v-if="!!spike" :spike="spike"></SpikeDetail>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useAsync,
  useRoute,
  watch
} from '@nuxtjs/composition-api';
import SpikeDetail from '~/components/organisms/spike-detail/SpikeDetail.vue';
import { spikesStore } from '~/store';
import { ISpikeModel } from '~/store/model/spike';
import { EventCategoryCode, shoeEventCategory } from '~/types/shoes/shoeEvents';

export default defineComponent({
  components: { SpikeDetail },
  setup() {
    const route = useRoute();

    const spike = ref<ISpikeModel>();

    useAsync(async () => {
      spike.value = await spikesStore.getBySlug(
        `${route.value.params.events}/${route.value.params.spikeId}`
      );
    });

    console.log(spike.value?.name);

    const items = [
      {
        text: 'ShoesPicks',
        href: '/'
      },
      {
        text: 'スパイクを探す',
        href: '/spikes/'
      },
      {
        text:
          shoeEventCategory[route.value.params.events as EventCategoryCode]
            ?.label,
        href: `/spikes/${route.value.params.events}`
      },
      {
        text: spike.value?.name,
        disabled: true
      }
    ];

    watch(
      () => route.value.params.spikeId,
      async spikeId => {
        spike.value = await spikesStore.getBySlug(
          `${route.value.params.events}/${spikeId}`
        );
        console.log(spike.value?.name);
      }
    );

    return {
      items,
      spike
    };
  }
});
</script>
<style lang="scss" scoped>
.page-content {
  padding: 24px;

  h2 {
    font-size: 20px;
    + * {
      margin-top: 24px;
    }
  }

  .v-breadcrumbs {
    + * {
      margin-top: 8px;
    }
  }
}
</style>
