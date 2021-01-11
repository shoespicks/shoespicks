<template>
  <b-button @click="externalLink" class="purchaseBtn" pill variant="outline-secondary">
    今すぐネットで購入する
  </b-button>
</template>
<script>
import Vue from "vue";
import { contentfulClient } from "~/plugins/contentful";

export default {
  data() {
    return {};
  },
  props: ["url"],
  methods: {
    externalLink() {
      // this.＝このclass内の変数を指定するもの
      window.open(this.url, "_blank");
    },
  },
};
</script>
