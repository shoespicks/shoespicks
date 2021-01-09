<template>
  <!-- <div @click="externalLink"> -->
  <b-button class="purchaseBtn" pill variant="outline-secondary">今すぐネットで購入する</b-button>
  <!-- </div> -->
</template>
<script>
import Vue from "vue";
import { contentfulClient } from "~/plugins/contentful";

export default {
  data() {
    return {
      spike: {},
      loading: false,
    };
  },
  methods: {
    async fetch() {
      await contentfulClient
        .getEntries({
          content_type: "spike",
        })
        .then(({ item }) => (this.spike = item))
        .catch(console.error);
      this.loading = false;
    },
    externalLink() {
      const url = this.spike.fields.amazonURL;
      window.location.href = url;
    },
  },
};

// interface Data {
//   spikeId: number;
//   spike: any;
// }

// export default Vue.extend({
//   data(): Data {
//     return {
//       spikeId: 0,
//       spike: {},
//     };
//   },
//   async asyncData({ payload, params }) {
//     const spike = !!payload
//       ? payload
//       : await contentfulClient
//           .getEntries({
//             content_type: "spike",
//           })
//           .then((e: any) => {
//             e.items?.forEach((item: any, index: number) => {
//               console.log(index + "つめdayo");
//               console.log(item);
//             });

//             return e.items[0];
//           });

//     return { spikeId: spike.sys.id, spike };
//   },
//   created() {},
//   methods: {
//     externalLink() {
//       const url = this.spike.fields.amazonURL;
//       window.location.href = url;
//     },
//   },
// });
</script>
