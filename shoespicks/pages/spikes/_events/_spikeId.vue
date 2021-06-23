<template>
  <div v-if="!!spike" class="page-content">
    <v-container>
      <v-breadcrumbs :items="items"></v-breadcrumbs>
    </v-container>
    <SpikeDetail :spike="spike"></SpikeDetail>
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

    const items = ref<{ text: string; href?: string; disabled?: boolean }[]>([
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
      }
    ]);

    useAsync(async () => {
      spike.value = await spikesStore.getBySlug(
        `${route.value.params.events}/${route.value.params.spikeId}`
      );

      items.value.push({
        text: spike.value.name,
        disabled: true
      });
      console.log(spike.value?.name);
    });

    watch(
      () => route.value.params.spikeId,
      async spikeId => {
        spike.value = await spikesStore.getBySlug(
          `${route.value.params.events}/${spikeId}`
        );

        items.value.pop();
        items.value.push({
          text: spike.value?.name,
          disabled: true
        });
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
  padding: 24px 0;

  > .container {
    + * {
      margin-top: 8px;
    }
  }
}
</style>
