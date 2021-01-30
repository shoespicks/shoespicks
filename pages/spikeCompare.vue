<template>
  <div>
    <!-- <b-form @submit.prevent="submit">プルダウンの入力でリロードしない -->
      <!-- <b-form @submit="submit" action="spikeCompare" method="get"> -->
      <!-- <b-form @submit="submit"> -->
        <!-- <b-form @change="submit"> -->
        <b-form-select v-model="spike1" class="mb-3" @change="submit">
          <b-form-select-option :value="null">{{spike.fields.spiketitle}}</b-form-select-option>
          <b-form-select-option-group :label="category">
            
          <b-form-select-option :value="selectSpike1.fields.id" v-for="selectSpike1 in spikes" :key="selectSpike1.fields.id">{{ selectSpike1.fields.spikeTitle }}</b-form-select-option>

          </b-form-select-option-group>
        </b-form-select>
      <!-- </b-form> -->
      
      <!-- <b-form @change="submit"> -->
        <b-form-select v-model="spike2" class="mb-3" @change="submit">
          <b-form-select-option :value="null">選択なし</b-form-select-option>
          <b-form-select-option-group :label="category">
          <b-form-select-option :value="selectSpike2.fields.id" v-for="selectSpike2 in spikes" :key="selectSpike2.fields.id">{{ selectSpike2.fields.spikeTitle }}</b-form-select-option>
          </b-form-select-option-group>
        </b-form-select>
      <!-- </b-form> -->

      <!-- プルダウン選択したタイトルのIDが出る -->
      <div class="mt-2">ID1: <strong>{{ spike1 }}</strong></div>  
      <div class="mt-2">ID2: <strong>{{ spike2 }}</strong></div>    
      <!-- <barChart :parameter="spike1" :parameter2="spike2"></barChart> -->


    <!-- <b-form @submit.prevent="submit2"> -->
      <!-- <b-form @change="submit2">
      <b-btn type="submit2">検索</b-btn>
      <b-card
        　v-for="spike in selectSpike2"
        :title="spike.fields.spikeTitle"
        img-alt="Image"
        style="max-width: 50%"
        tag="article"
      > -->
      <!-- </b-card>
    </b-form> -->
    <!-- <section v-if="selectSpike2!=null">
      <p>{{selectSpike2}}</p>
      <barChart :parameter="spike" :parameter2="spike2"></barChart>
    </section>
    <section v-else>
      <barChart :parameter="spike"></barChart>
    </section> -->
        <section v-if="selectSpike2!=null">
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
  selected: any;
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
      spike2: null,
      query: this.$route.query,
      selected: null,
      options: [{ value: null, text: 'はい。選べ。' },],
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
          console.log(spike);
    return { spike };
  },

  created: function() {
    var spikeCategory = this.spike.fields.spikeCategory;
    // console.log(spikeCategory);
    var searchInput: { [key: string]: string } = {
        content_type: "spike",
        // "fields.id": this.spike.name,
        "fields.spikeCategory[match]": spikeCategory[0],
      };
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          // console.log(item);
        });
        this.category = spikeCategory[0];
        this.spikes = e.items;
      });
    },

  methods: {
    // submit(spike1,spike2){
    //   var spike1String = String(this.spike1);
    //   var spike2String = String(this.spike2);
    //   this.$router.push({query: {spikeName1: spike1String,spikeName2: spike2String}});
    //   // console.log(this.spikes);
    //   var searchInput1: { [key: string]: string } = {
    //     content_type: "spike",
    //     "fields.id": this.spike1,
    //   };
    //   var searchInput2: { [key: string]: string } = {
    //     content_type: "spike",
    //     "fields.id": this.spike2,
    //   };

    //   contentfulClient.getEntries(searchInput1).then((e: any) => {
    //     e.items?.forEach((item: any, index: number) => {
    //       // console.log(item);
    //       });
    //       console.log(e.items[0]);
    //       this.parameter1 = e.items[0];
    //     });

    //     contentfulClient.getEntries(searchInput2).then((e: any) => {
    //     e.items?.forEach((item: any, index: number) => {
    //       });
    //       console.log(e.items[0]);
    //       this.parameter2 = e.items[0];
    //     });
    // },

    submit(){
      console.log(this.spike2);
      var spike1String = String(this.spike1);
      var spike2String = String(this.spike2);
      this.$router.push({query: {spikeName1: spike1String,spikeName2: spike2String}});
      // console.log(this.spikes);
      var searchInput1: { [key: string]: string } = {
        content_type: "spike",
        "fields.id": this.spike1,
      };
      var searchInput2: { [key: string]: string } = {
        content_type: "spike",
        "fields.id": this.spike2,
      };

      contentfulClient.getEntries(searchInput1).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          // console.log(item);
          });
          console.log(e.items[0]);
          this.parameter1 = e.items[0];
        });

        contentfulClient.getEntries(searchInput2).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          });
          console.log(e.items[0]);
          this.parameter2 = e.items[0];
        });
    },

  },
  
});
</script>
