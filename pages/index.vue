<template>
  <div class="container">
    <p @click="$nuxt.$router.push('spikeSearch')">
      <b-btn>検索する</b-btn>
    </p>
  </div>
</template>

<script lang="ts">
import { contentfulClient } from "~/plugins/contentful";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      spikes: [],
    };
  },
});
</script>
