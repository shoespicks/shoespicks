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
      window.open(this.url, "_blank");
    },
  },
};
</script>

<style>
.purchaseBtn {
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(to bottom, #ffd800, #e2be00) !important;
  border-color: #ffd900;
  color: #fff !important;
  padding: 10px 25px 15px;
  border-radius: 20px;
}
.purchaseBtn:hover {
  color: #ffd900;
  background: #fff !important;
  border-color: #ffd900;
}
</style>
