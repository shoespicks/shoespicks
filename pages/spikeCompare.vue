<template>
  <barChart :parameter="spike" :parameter2="spike"></barChart>
</template>

<script lang="ts">
import Vue from "vue";
import { contentfulClient } from "~/plugins/contentful";
import BarChart from "@/components/Molecule/BarChart.vue";

interface Data {
  spikeId: number;
  spike: any;
}

export default Vue.extend({
  components: {
    BarChart,
  },
  data(): Data {
    return {
      spikeId: 0,
      spike: {},
    };
  },
  async asyncData({ payload, params }) {
    const spike = !!payload
      ? payload
      : await contentfulClient
          .getEntries({
            content_type: "spike",
            "fields.id": "chronoinx9",
          })
          .then((e: any) => {
            e.items?.forEach((item: any, index: number) => {
              console.log(item);
            });

            return e.items[0];
          });

    return { spikeId: spike.sys.id, spike };
  },
  created() {},
});
</script>
