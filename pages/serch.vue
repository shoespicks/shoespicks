<template>
  <div class="container">
    <b-form @submit="submit">
      <b-btn type="submit">検索</b-btn>
    </b-form>
    <p v-for="spike in spikes" @click="$nuxt.$router.push(spike.fields.id)">
      {{ spike.fields.spikeTitle }}
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
  methods: {
    submit(e: Event) {
      console.log("submit");
      e.preventDefault();

      const searchInput: { [key: string]: string } = {
        content_type: "spike",
      };

      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          console.log(index + "つめ");
          console.log(item);
        });

        this.spikes = e.items;
      });
    },
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
