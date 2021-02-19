<template>
  <div>
    <barChart :parameter1="parameter1" :parameter2="parameter2"></barChart>

    <div class="compareBlock">
      <div class="compareSelect1">
        <b-form-select v-model="spike1" class="mb-3" @change="submit">
          <b-form-select-option-group :label="category">
            <b-form-select-option
              v-for="selectSpike in options"
              v-bind:value="selectSpike.value"
              :key="selectSpike.value"
              :selected="spike1"
              >{{ selectSpike.text }}
            </b-form-select-option>
          </b-form-select-option-group>
        </b-form-select>

        <b-img :src="spikeImgUrl1" alt="スパイク比較用画像1"></b-img>
        <b-table
          striped
          hover
          caption-top
          label="Table Options"
          :items="table1"
          :fields="[{ key: 'key' }, { key: 'result' }]"
        >
        </b-table>

        <b-button pill variant="primary" @click="$nuxt.$router.push(spike1)">詳細を見る</b-button>
      </div>

      <div class="compareSelect2">
        <b-form-select v-model="spike2" class="mb-3" @change="submit">
          <b-form-select-option :value="null">選択はよ</b-form-select-option>
          <b-form-select-option-group :label="category">
            <b-form-select-option
              v-for="selectSpike in options"
              v-bind:value="selectSpike.value"
              :key="selectSpike.value"
              :selected="spike2"
              >{{ selectSpike.text }}
            </b-form-select-option>
          </b-form-select-option-group>
        </b-form-select>

        <div v-if="spike2 != null">
          <b-img :src="spikeImgUrl2" alt="スパイク比較用画像2"></b-img>
          <b-table
            striped
            hover
            caption-top
            label="Table Options"
            :items="table2"
            :fields="[{ key: 'key' }, { key: 'result' }]"
          >
          </b-table>

          <b-button pill variant="primary" @click="$nuxt.$router.push(spike2)">詳細を見る</b-button>
        </div>
      </div>
    </div>
    <!-- プルダウン選択したタイトルのIDが出る -->
    <div class="mt-2">
      ID1: <strong>{{ spike1 }}</strong>
    </div>
    <div class="mt-2">
      ID2: <strong>{{ spike2 }}</strong>
    </div>

    <section v-if="spike2 != null">
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
import VueRouter from "vue-router";
Vue.use(VueRouter);

interface Data {
  spikeId: number;
  spike: any; //spikeName1のデータ
  spikes: any; //spikeName1のカテゴリに属するスパイクデータ
  spike1: any;
  spike2: any;
  query: any;
  options: any;
  category: any;
  parameter1: any;
  parameter2: any;
  table1: any;
  table2: any;
  spikeImgUrl1: any;
  spikeImgUrl2: any;
}

export default Vue.extend({
  components: {
    BarChart,
  },

  data(): Data {
    return {
      spikeId: 0,
      spike: {},
      spikes: [],
      spike1: this.$route.query.spikeName1,
      spike2: this.$route.query.spikeName2,
      query: this.$route.query,
      options: [],
      category: null,
      parameter1: [],
      parameter2: [],
      table1: [],
      table2: [],
      spikeImgUrl1: null,
      spikeImgUrl2: null,
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

  created: function () {
    /////////////////////////////////////////////////////
    //スパイクのカテゴリを取得して、プルダウンの内容を決定
    /////////////////////////////////////////////////////

    this.spike1 = this.$route.query.spikeName1;
    this.spike2 = this.$route.query.spikeName2;

    //飛んできたページのスパイクカテゴリを取得
    var spikeCategory = this.spike.fields.spikeCategory;
    //↑のカテゴリのスパイクデータをcontentfulから取得するためのルール定義
    var searchInput: { [key: string]: string } = {
      content_type: "spike",
      "fields.spikeCategory[match]": spikeCategory[0],
    };
    //↑のカテゴリのスパイクデータをcontentfulから取得、spikesに格納
    contentfulClient.getEntries(searchInput).then((e: any) => {
      e.items?.forEach((item: any, index: number) => {});
      this.category = spikeCategory[0];
      this.spikes = e.items;

      //プルダウン用の配列optionsにspikesのタイトルを格納→{[value:chronoonix,text:クロノオニキス],[・・・]}
      for (let i = 0; i < this.spikes.length; i++) {
        this.options.push({
          value: this.spikes[i].fields.id,
          text: this.spikes[i].fields.spikeTitle,
        });
      }
      console.log("オプション");
      console.log(this.options);
    });
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////

    //初期スパイクをパラメータにセットするテンプレート
    var spikeWeight1 = this.spike.fields.spikeWeight;
    var spikeWidth1 = this.spike.fields.spikeWidth;
    var spikeAngle1 = this.spike.fields.spikeAngle;
    var spikespikeGlip1 = this.spike.fields.spikeGlip;
    var spikeResilience1 = this.spike.fields.spikeResilience;
    this.parameter1 = [spikeWeight1, spikeWidth1, spikeAngle1, spikespikeGlip1, spikeResilience1];
    //初期スパイクをパラメータにセットするテンプレート

    //選択1の表データテンプレート
    this.table1 = [
      { key: "価格", result: this.spike.fields.spikePrice },
      { key: "重さ", result: this.spike.fields.spikeWeightNumber },
      { key: "対応種目", result: String(this.spike.fields.spikeEvent) },
      { key: "対応環境", result: String(this.spike.fields.spikeEnvironment) },
      {
        key: "サイズ",
        result: this.spike.fields.spikeMinSize + "〜" + this.spike.fields.spikeMaxSize,
      },
      { key: "アッパー素材", result: this.spike.fields.spikeUpperMaterial },
      { key: "ソール素材", result: this.spike.fields.spikeSoleMaterial },
      { key: "ピンの種類", result: String(this.spike.fields.spikePinType) },
      { key: "ピンの長さ", result: this.spike.fields.spikePinLength + "mm" },
    ];
    //選択1の表データテンプレート

    //選択1の画像のURL
    this.spikeImgUrl1 = this.spike.fields.spikePhoto[0].fields.file.url;
    //選択1の画像のURL

    if (this.spike2 != null) {
      var searchInput2: { [key: string]: string } = {
        content_type: "spike",
        "fields.id": this.spike2,
      };
      contentfulClient.getEntries(searchInput2).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});

        //パラメータ2作るテンプレート
        var spikeWeight2 = e.items[0].fields.spikeWeight;
        var spikeWidth2 = e.items[0].fields.spikeWidth;
        var spikeAngle2 = e.items[0].fields.spikeAngle;
        var spikespikeGlip2 = e.items[0].fields.spikeGlip;
        var spikeResilience2 = e.items[0].fields.spikeResilience;
        this.parameter2 = [
          spikeWeight2,
          spikeWidth2,
          spikeAngle2,
          spikespikeGlip2,
          spikeResilience2,
        ];
        //パラメータ2作るテンプレート

        //選択2の表データテンプレート
        this.table2 = [
          { key: "価格", result: e.items[0].fields.spikePrice },
          { key: "重さ", result: e.items[0].fields.spikeWeightNumber },
          { key: "対応種目", result: String(e.items[0].fields.spikeEvent) },
          { key: "対応環境", result: String(e.items[0].fields.spikeEnvironment) },
          {
            key: "サイズ",
            result: e.items[0].fields.spikeMinSize + "〜" + e.items[0].fields.spikeMaxSize,
          },
          { key: "アッパー素材", result: e.items[0].fields.spikeUpperMaterial },
          { key: "ソール素材", result: e.items[0].fields.spikeSoleMaterial },
          { key: "ピンの種類", result: String(e.items[0].fields.spikePinType) },
          { key: "ピンの長さ", result: e.items[0].fields.spikePinLength + "mm" },
        ];
        //選択2の表データテンプレート

        //選択2の画像のURL
        this.spikeImgUrl2 = e.items[0].fields.spikePhoto[0].fields.file.url;
        //選択2の画像のURL
      });
    }
  },

  methods: {
    submit() {
      this.$router.push({
        query: { spikeName1: String(this.spike1), spikeName2: String(this.spike2) },
      });

      var searchInput1: { [key: string]: string } = {
        content_type: "spike",
        "fields.id": this.spike1,
      };

      contentfulClient.getEntries(searchInput1).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});

        //パラメータ1作るテンプレート
        var spikeWeight1 = e.items[0].fields.spikeWeight;
        var spikeWidth1 = e.items[0].fields.spikeWidth;
        var spikeAngle1 = e.items[0].fields.spikeAngle;
        var spikespikeGlip1 = e.items[0].fields.spikeGlip;
        var spikeResilience1 = e.items[0].fields.spikeResilience;
        this.parameter1 = [
          spikeWeight1,
          spikeWidth1,
          spikeAngle1,
          spikespikeGlip1,
          spikeResilience1,
        ];
        //パラメータ1作るテンプレート

        //選択1の表データテンプレート
        this.table1 = [
          { key: "価格", result: e.items[0].fields.spikePrice },
          { key: "重さ", result: e.items[0].fields.spikeWeightNumber },
          { key: "対応種目", result: String(e.items[0].fields.spikeEvent) },
          { key: "対応環境", result: String(e.items[0].fields.spikeEnvironment) },
          {
            key: "サイズ",
            result: e.items[0].fields.spikeMinSize + "〜" + e.items[0].fields.spikeMaxSize,
          },
          { key: "アッパー素材", result: e.items[0].fields.spikeUpperMaterial },
          { key: "ソール素材", result: e.items[0].fields.spikeSoleMaterial },
          { key: "ピンの種類", result: String(e.items[0].fields.spikePinType) },
          { key: "ピンの長さ", result: e.items[0].fields.spikePinLength + "mm" },
        ];
        //選択1の表データテンプレート

        //選択1の画像のURL
        this.spikeImgUrl1 = e.items[0].fields.spikePhoto[0].fields.file.url;
        //選択1の画像のURL

        console.log("1の値");
        console.log(this.parameter1);
      });

      if (this.spike2) {
        var searchInput2: { [key: string]: string } = {
          content_type: "spike",
          "fields.id": this.spike2,
        };
        contentfulClient.getEntries(searchInput2).then((e: any) => {
          e.items?.forEach((item: any, index: number) => {});

          //パラメータ2作るテンプレート
          var spikeWeight2 = e.items[0].fields.spikeWeight;
          var spikeWidth2 = e.items[0].fields.spikeWidth;
          var spikeAngle2 = e.items[0].fields.spikeAngle;
          var spikespikeGlip2 = e.items[0].fields.spikeGlip;
          var spikeResilience2 = e.items[0].fields.spikeResilience;
          this.parameter2 = [
            spikeWeight2,
            spikeWidth2,
            spikeAngle2,
            spikespikeGlip2,
            spikeResilience2,
          ];
          //パラメータ2作るテンプレート

          this.table2 = [
            { key: "価格", result: e.items[0].fields.spikePrice },
            { key: "重さ", result: e.items[0].fields.spikeWeightNumber },
            { key: "対応種目", result: String(e.items[0].fields.spikeEvent) },
            { key: "対応環境", result: String(e.items[0].fields.spikeEnvironment) },
            {
              key: "サイズ",
              result: e.items[0].fields.spikeMinSize + "〜" + e.items[0].fields.spikeMaxSize,
            },
            { key: "アッパー素材", result: e.items[0].fields.spikeUpperMaterial },
            { key: "ソール素材", result: e.items[0].fields.spikeSoleMaterial },
            { key: "ピンの種類", result: String(e.items[0].fields.spikePinType) },
            { key: "ピンの長さ", result: e.items[0].fields.spikePinLength + "mm" },
          ];

          //選択2の画像のURL
          this.spikeImgUrl2 = e.items[0].fields.spikePhoto[0].fields.file.url;
          //選択2の画像のURL

          console.log("2の値");
          console.log(this.parameter2);
        });
      }
    },
  },
});
</script>

<style>
.compareSelect1 {
  display: inline-block;
  /* float: left; */
}

.compareSelect2 {
  display: inline-block;
  /* float: right; */
}
</style>
