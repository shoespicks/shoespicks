<template>
  <div>
    <b-form @submit.prevent="submit"><!--プルダウンの入力でリロードしない-->
        <b-form-select v-model="spike1" class="mb-3">
          <b-form-select-option :value="null">選べぇーーー！！</b-form-select-option>
          <!-- <b-form-select v-model="selected" :options="options"></b-form-select> -->
          <b-form-select-option-group label="Grouped options">
          <b-form-select-option :value="spike.fields.id" v-for="spike in spikes" :key="spike.fields.id">{{ spike.fields.spikeTitle }}</b-form-select-option>
          </b-form-select-option-group>
        </b-form-select>

        <div class="mt-2">ID: <strong>{{ spike1 }}</strong></div>

        <section><p>{{ $route.query.spikeName }}</p></section>
        
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
        <!-- <barChart :parameter="query" :parameter2="query"></barChart> -->
      
      </b-card>
    </b-form>
    <section><p>{{spikes2}}</p></section>
    <barChart v-if="spikes2" :parameter="spike" :parameter2="spikes2"></barChart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { contentfulClient } from "~/plugins/contentful";
import BarChart from "@/components/Molecule/BarChart.vue";
import VueRouter from 'vue-router'
Vue.use(VueRouter)

interface Data {
  spikeId: number;
  spike: any,
  spikes: any;
  spikes2: any;
  spike1: any;
  query: any,
  selected: any;
  options: any;
}

export default Vue.extend({
  components: {
    BarChart,
  },

  data(): Data {
    return {
      spikeId: 0,
      spike:{},
      spikes: [],
      spikes2: [],
      spike1: null,
      query: this.$route.query.spikeName,
      selected: null,
      options: [
        { value: null, text: 'はい。選べ。' },
        { 
          label:'Grouped options',
          options:[
            { value: 'a', text: 'This is First option' },
            { value: 'b', text: 'Selected Option' },
            { value: { C: '3PO' }, text: 'This is an option with object value' },
            { value: 'd', text: 'This one is disabled', disabled: true },
          ]}
      ],
    };
  },
  
async asyncData({ payload, query }) {
    const spike = !!payload
      ? payload
      : await contentfulClient
          .getEntries({
            content_type: "spike",
            "fields.id": query.spikeName,
            // "fields.id": params.id,
          })
          .then((e: any) => {
            e.items?.forEach((item: any, index: number) => {
              // console.log(index + "つめdayo");
              // console.log(item);
            });
             return e.items[0];
          });
          
    return { spike };
  },

  created: function() {
    console.log("ちなみ");
    var searchInput: { [key: string]: string } = {
        content_type: "spike",
        // "fields.id[match]": this.form.name,
      };
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          // console.log(item);
        });
        this.spikes = e.items;
      });
    },

  methods: {
    submit(e: Event) {
      // e.preventDefault();

      var searchInput: { [key: string]: string } = {
        content_type: "spike",
        // "fields.id[match]": this.form.name,
      };
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          // console.log(item);
        });
        this.spikes = e.items;
      });
    },
    submit2(e: Event) {
      // e.preventDefault();
      var searchInput: { [key: string]: string } = {
        content_type: "spike",
        // "fields.id[match]": this.form.name,
        "fields.id[match]": this.spike1,
      };
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          // console.log(item);
        });
        this.spikes2 = e.items;
        // [
        //   e.items.fields.spikeWeight,
        //   e.items.fields.spikeWidth,
        //   e.items.fields.spikeAngle,
        //   e.items.fields.spikeGlip,
        //   e.items.fields.spikeResilience,
        //   ];
      });
      
    },
  },
});
</script>
