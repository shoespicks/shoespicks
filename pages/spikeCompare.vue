<template>
  <div>
    <barChart :parameter1="parameter1" :parameter2="parameter2"></barChart>
    
    <b-form-select v-model="spike1" class="mb-3" @change="submit">
      <b-form-select-option-group :label="category">
        <b-form-select-option v-for="selectSpike in options" v-bind:value="selectSpike.value" :key="selectSpike.value" :selected="spike1">{{selectSpike.text}}</b-form-select-option>
      </b-form-select-option-group>
    </b-form-select>
    
    <b-form-select v-model="spike2" class="mb-3" @change="submit">
      <b-form-select-option :value="null">選択はよ</b-form-select-option>
      <b-form-select-option-group :label="category">
      <b-form-select-option v-for="selectSpike in options" v-bind:value="selectSpike.value" :key="selectSpike.value" :selected="spike2">{{selectSpike.text}}</b-form-select-option>
      </b-form-select-option-group>
    </b-form-select>

      <!-- プルダウン選択したタイトルのIDが出る -->
      <div class="mt-2">ID1: <strong>{{ spike1 }}</strong></div>  
      <div class="mt-2">ID2: <strong>{{ spike2 }}</strong></div>    

        <section v-if="spike2!=null">
      <p>2が入った</p>
    </section>
    <section v-else>
      <p>2が入ってない</p>
    </section>
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
  spike: any,//spikeName1のデータ
  spikes: any;//spikeName1のカテゴリに属するスパイクデータ
  spike1: any;
  spike2: any;
  query: any,
  options: any;
  category: any;
  parameter1: any;
  parameter2: any;
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
      spike1: this.$route.query.spikeName1,
      spike2: this.$route.query.spikeName2,
      query: this.$route.query,
      options: [],
      category: null,  
      parameter1: [],
      parameter2: [],
    };
  },
  
async asyncData({ payload, query }) {
    const spike = !!payload
      ? payload
      : await contentfulClient
          .getEntries({
            content_type: "spike",
            "fields.id": query.spikeName1,
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
    
    /////////////////////////////////////////////////////
    //スパイクのカテゴリを取得して、プルダウンの内容を決定
    /////////////////////////////////////////////////////

    this.spike1=this.$route.query.spikeName1;
    this.spike2=this.$route.query.spikeName2;
    
    //飛んできたページのスパイクカテゴリを取得
    var spikeCategory = this.spike.fields.spikeCategory;
    //↑のカテゴリのスパイクデータをcontentfulから取得するためのルール定義
    var searchInput: { [key: string]: string } = {
        content_type: "spike",
        "fields.spikeCategory[match]": spikeCategory[0],
    };
    //↑のカテゴリのスパイクデータをcontentfulから取得、spikesに格納
    contentfulClient.getEntries(searchInput).then((e: any) => {
      e.items?.forEach((item: any, index: number) => {  });
      this.category = spikeCategory[0];
      this.spikes = e.items;
    
    //プルダウン用の配列optionsにspikesのタイトルを格納→{[value:chronoonix,text:クロノオニキス],[・・・]}
      for (let i=0; i<this.spikes.length; i++){
        this.options.push({value:this.spikes[i].fields.id,text:this.spikes[i].fields.spikeTitle});
      }
      console.log("オプション");
      console.log(this.options);
    })
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////


    var spikeWeight1 = this.spike.fields.spikeWeight;
    var spikeWidth1 = this.spike.fields.spikeWidth;
    var spikeAngle1 = this.spike.fields.spikeAngle;
    var spikespikeGlip1 = this.spike.fields.spikeGlip;
    var spikeResilience1 = this.spike.fields.spikeResilience;
    this.parameter1 = [spikeWeight1,spikeWidth1,spikeAngle1,spikespikeGlip1,spikeResilience1]

    if(this.spike2!=null){
      var searchInput2: { [key: string]: string } = {
            content_type: "spike",
        "fields.id": this.spike2,
      };
        contentfulClient.getEntries(searchInput2).then((e: any) => {
          e.items?.forEach((item: any, index: number) => {});
        var spikeWeight2 = e.items[0].fields.spikeWeight;
        var spikeWidth2 = e.items[0].fields.spikeWidth;
        var spikeAngle2 = e.items[0].fields.spikeAngle;
        var spikespikeGlip2 = e.items[0].fields.spikeGlip;
        var spikeResilience2 = e.items[0].fields.spikeResilience;
        this.parameter2 = [spikeWeight2,spikeWidth2,spikeAngle2,spikespikeGlip2,spikeResilience2]
        });
    }

    },

  methods: {
    submit(){

      this.$router.push({query: {spikeName1: String(this.spike1),spikeName2: String(this.spike2)}});
      
      var searchInput1: { [key: string]: string } = {
        content_type: "spike",
        "fields.id": this.spike1,
      };

      contentfulClient.getEntries(searchInput1).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});
        var spikeWeight1 = e.items[0].fields.spikeWeight;
        var spikeWidth1 = e.items[0].fields.spikeWidth;
        var spikeAngle1 = e.items[0].fields.spikeAngle;
        var spikespikeGlip1 = e.items[0].fields.spikeGlip;
        var spikeResilience1 = e.items[0].fields.spikeResilience;
        this.parameter1 = [spikeWeight1,spikeWidth1,spikeAngle1,spikespikeGlip1,spikeResilience1]
        // this.parameter1 = JSON.stringify(this.parameter1);
          // this.parameter1 = e.items[0];
          console.log("1の値");
          console.log(this.parameter1);
        });


        if(this.spike2){

          
          var searchInput2: { [key: string]: string } = {
            content_type: "spike",
        "fields.id": this.spike2,
      };
        contentfulClient.getEntries(searchInput2).then((e: any) => {
          e.items?.forEach((item: any, index: number) => {});
        var spikeWeight2 = e.items[0].fields.spikeWeight;
        var spikeWidth2 = e.items[0].fields.spikeWidth;
        var spikeAngle2 = e.items[0].fields.spikeAngle;
        var spikespikeGlip2 = e.items[0].fields.spikeGlip;
        var spikeResilience2 = e.items[0].fields.spikeResilience;
        this.parameter2 = [spikeWeight2,spikeWidth2,spikeAngle2,spikespikeGlip2,spikeResilience2]
        // this.parameter2 = JSON.stringify(this.parameter2);
        console.log("2の値");
        console.log(this.parameter2);
        });
          }
        
    },

  },
  
});
</script>
