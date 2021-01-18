<template>
  <div>
    <b-form @submit.prevent="submit">
        <b-form-select v-model="spike1" class="mb-3">
          <b-form-select-option :value="null">選べぇーーー！！</b-form-select-option>
          <b-form-select-option-group label="Grouped options">
            <b-form-select-option :value="spike.fields.id" v-for="spike in spikes" :key="spike.fields.id">{{ spike.fields.spikeTitle }}</b-form-select-option>
          </b-form-select-option-group>
        </b-form-select>

        <div class="mt-2">ID: <strong>{{ spike1 }}</strong></div>
      <b-btn type="submit">一覧取得</b-btn>
    </b-form>
    <b-form @submit.prevent="submit2">
      <b-btn type="submit2">検索</b-btn>
      <b-card
        　v-for="spike in spikes2"
        :title="spike.fields.spikeTitle"
        img-alt="Image"
        style="max-width: 50%"
        tag="article"
      >
        <barChart :parameter="spike" :parameter2="spike"></barChart>
      </b-card>
    </b-form>
  </div>
</template>

<script lang="ts">
import { contentfulClient } from "~/plugins/contentful";
import Vue from "vue";
import BarChart from "@/components/Molecule/BarChart.vue";

interface Data {
  spikeId: number;
  spikes: any;
  spikes2: any;
  spike1: any;
}

export default Vue.extend({
  components: {
    BarChart,
  },

  data(): Data {
    return {
      spikeId: 0,
      spikes: [],
      spikes2: [],
      spike1: null,
    };
  },
  methods: {
    submit(e: Event) {
      e.preventDefault();

      var searchInput: { [key: string]: string } = {
        content_type: "spike",
        // "fields.id[match]": this.form.name,
      };
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          console.log(item);
        });
        this.spikes = e.items;
      });
    },
    submit2(e: Event) {
      e.preventDefault();

      var searchInput: { [key: string]: string } = {
        content_type: "spike",
        // "fields.id[match]": this.form.name,
        "fields.id[match]": this.spike1,
      };
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          console.log(item);
        });
        this.spikes2 = e.items;
      });
    },
  },
});
</script>
