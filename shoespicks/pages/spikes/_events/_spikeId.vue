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
  useRoute
} from '@nuxtjs/composition-api';
import SpikeDetail from '~/components/organisms/SpikeDetail.vue';
import { spikesStore } from '~/store';
import { EventCategoryCode, shoeEventCategory } from '~/types/shoes/shoeEvents';

export default defineComponent({
  components: { SpikeDetail },
  setup() {
    const route = useRoute();

    const spike = useAsync(() =>
      spikesStore.getBySlug(
        `${route.value.params.events}/${route.value.params.spikeId}`
      )
    );

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
            ?.title,
        href: `/spikes/${route.value.params.events}`
      },
      {
        text: spike.value?.name,
        disabled: true
      }
    ];
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
