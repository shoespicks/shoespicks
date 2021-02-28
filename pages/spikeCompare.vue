<template>
  <div>
    <h1 class="compareTitle">{{ this.spike1.fields.spikeCategory[0] }}
      スパイクを比較する</h1>
    <barChart :parameter1="parameter1" :parameter2="parameter2"></barChart>
    <div class="compareSelectCon">
      <div class="compareSelect1">
          <div class="spikeImgBox">
            <b-img :src="spikeImgUrl1" class="compareSpikeImg" alt="スパイク比較用画像1"></b-img>
          </div>
        <!-- spike1のselectフィールド -->
          <b-form-select v-model="spikeId1" class="mb-3 spikeSelect" @change="submit">
            <b-form-select-option-group :label="category">
              <b-form-select-option
                v-for="selectSpike in options"
                v-bind:value="selectSpike.value"
                :key="selectSpike.value"
                :selected="spikeId1"
                >{{ selectSpike.text }}
              </b-form-select-option>
            </b-form-select-option-group>
          </b-form-select>

        <!-- spike1のtable -->
        <b-table
          class="spikeInfoTable"
          hover
          caption-top
          borderless
          label="Table Options"
          :items="table1"
          :fields="[{ key: 'key' }, { key: 'result' }]"
        >
        </b-table>
        <div class="InfoBtnBox">
          <b-button pill variant="primary" @click="$nuxt.$router.push(spikeId1)" class="spikeInfoBtn">
            詳細を見る
            </b-button>
        </div>
      </div>

      <!-- spie2の入れ物 -->
      <div class="compareSelect2">
        <div class="spikeImgBox">
            <b-img :src="spikeImgUrl2"  class="compareSpikeImg" alt="スパイク比較用画像2"></b-img>
        </div>
        <!-- spike2のselectフィールド -->
        <b-form-select v-model="spikeId2" class="mb-3 spikeSelect" @change="submit">
            <b-form-select-option :value="null">比較する</b-form-select-option>
            <b-form-select-option-group :label="category">
              <b-form-select-option
                v-for="selectSpike in options"
                v-bind:value="selectSpike.value"
                :key="selectSpike.value"
                :selected="spikeId2"
                >{{ selectSpike.text }}
              </b-form-select-option>
            </b-form-select-option-group>
        </b-form-select>
        <!-- spike2のtable -->
        <div v-if="spikeId2 != null">
          <b-table
            class="spikeInfoTable2"
            hover
            caption-top
            borderless
            label="Table Options"
            :items="table2"
            :fields="[{ key: 'key' }, { key: 'result' }]"
          >
          </b-table>
          <div class="InfoBtnBox">
            <b-button pill variant="primary" @click="$nuxt.$router.push(spikeId2)" class="spikeInfoBtn">詳細を見る</b-button>
          </div>
        </div>
      </div>
    </div>


    <!-- プルダウン選択したタイトルのIDが出る -->
    <div class="mt-2">
      ID1: <strong>{{ spikeId1 }}</strong>
    </div>
    <div class="mt-2">
      ID2: <strong>{{ spikeId2 }}</strong>
    </div>

    <section v-if="spikeId2 != null">
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
  spike1: any;//プルダウン選択1のスパイクデータ
  spike2: any;//プルダウン選択2のスパイクデータ
  spikes: any;//遷移元のスパイクのカテゴリに属するスパイクデータ
  spikeId1: any;//プルダウン選択1のスパイクID
  spikeId2: any;//プルダウン選択2のスパイクID
  query: any;//クエリパラメータ
  options: any;//プルダウン選択用の値たち
  category: any;//遷移元のスパイクのカテゴリ
  parameter1: any;//チャートに渡すパラメータ1（選択1のデータ）
  parameter2: any;//チャートに渡すパラメータ2（選択2のデータ）
  table1: any;//プルダウン選択1の表データ
  table2: any;//プルダウン選択2の表データ
  spikeImgUrl1: any;//プルダウン選択1の画像データ
  spikeImgUrl2: any;//プルダウン選択2の画像データ
}

export default Vue.extend({
  components: {
    BarChart,
  },

  data(): Data {
    return {
      spike1: {},
      spike2: {},
      spikes: [],
      spikeId1: this.$route.query.spikeName1,
      spikeId2: this.$route.query.spikeName2,
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
    const spike1 = !!payload
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

    return { spike1 };
  },

  created: function () {

    //プルダウンの初期値を更新
    this.spikeId1 = this.$route.query.spikeName1;
    this.spikeId2 = this.$route.query.spikeName2;

    //プルダウンのリストを作成
    this.makePulldownList();
    //初期スパイクをチャートのパラメータ1にセット
    this.makeParameter1();
    //選択1の表データ作成
    this.makeTable1();
    //選択1の画像のURL
    this.spikeImgUrl1 = this.spike1.fields.spikePhoto[0].fields.file.url;

    //プルダウン選択2がある場合
    if (this.spikeId2 != null) {
      this.makeCompareData2();
    }

  },

  methods: {
    submit() {
      //クエリパラメータ付与
      this.$router.push({query: { spikeName1: String(this.spikeId1), spikeName2: String(this.spikeId2)}});
      //選択1のスパイク画像、表、チャート用のパラメータ作成
      this.makeCompareData1();
      //プルダウン選択2がある場合プルダウン選択2で選ばれたスパイクの画像、表、チャート用のパラメータ作成
      if (this.spikeId2) {
        this.makeCompareData2();
      }
    },

    makePulldownList(){
      //飛んできたページのスパイクカテゴリを取得
      var spikeCategory = this.spike1.fields.spikeCategory[0];
      //↑のカテゴリのスパイクデータをcontentfulから取得するためのルール定義
      var searchInput: { [key: string]: string } = {
        content_type: "spike",
        "fields.spikeCategory[match]": spikeCategory,
        };
      //↑のカテゴリのスパイクデータをcontentfulから取得、spikesに格納
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});
        this.category = spikeCategory;
        this.spikes = e.items;
        //プルダウン用の配列optionsにspikesのタイトルを格納→{[value:chronoonix,text:クロノオニキス],[・・・]}
        for (let i = 0; i < this.spikes.length; i++) {
          this.options.push({
            value: this.spikes[i].fields.id,
            text: this.spikes[i].fields.spikeTitle,
            });
        }
      });
    },

    makeCompareData1(){
      //プルダウン選択1で選ばれたスパイクデータ取得
      var searchInput1: { [key: string]: string } = {
        content_type: "spike",
        "fields.id": this.spikeId1,
      };
      contentfulClient.getEntries(searchInput1).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});
        this.spike1 = e.items[0];
        //パラメータ1作るテンプレート
        this.makeParameter1();
        //選択1の表データテンプレート
        this.makeTable1();
        //選択1の画像のURL
        this.spikeImgUrl1 = this.spike1.fields.spikePhoto[0].fields.file.url;
        });
    },

    makeCompareData2(){
          var searchInput2: { [key: string]: string } = {
          content_type: "spike",
          "fields.id": this.spikeId2,
        };
        contentfulClient.getEntries(searchInput2).then((e: any) => {
          e.items?.forEach((item: any, index: number) => {});
          this.spike2 = e.items[0];

          //チャートに送るパラメータ2作成
          this.makeParameter2();
          //表2を作成
          this.makeTable2();
          //選択2の画像のURL
          this.spikeImgUrl2 = this.spike2.fields.spikePhoto[0].fields.file.url;
        });
      
    },
    makeParameter1(){
    var spikeWeight1 = this.spike1.fields.spikeWeight;
    var spikeWidth1 = this.spike1.fields.spikeWidth;
    var spikeAngle1 = this.spike1.fields.spikeAngle;
    var spikespikeGlip1 = this.spike1.fields.spikeGlip;
    var spikeResilience1 = this.spike1.fields.spikeResilience;
    this.parameter1 = [spikeWeight1, spikeWidth1, spikeAngle1, spikespikeGlip1, spikeResilience1];
    },

    makeTable1(){
      this.table1 = [
      { key: "定価", result: this.spike1.fields.spikePrice + "円" },
      { key: "重さ", result: this.spike1.fields.spikeWeightNumber + "g" },
      { key: "対応種目", result: String(this.spike1.fields.spikeEvent) },
      { key: "対応環境", result: String(this.spike1.fields.spikeEnvironment) },
      {
        key: "サイズ",
        result: this.spike1.fields.spikeMinSize + "〜" + this.spike1.fields.spikeMaxSize,
      },
      { key: "アッパー素材", result: this.spike1.fields.spikeUpperMaterial },
      { key: "ソール素材", result: this.spike1.fields.spikeSoleMaterial },
      { key: "ピンの種類", result: String(this.spike1.fields.spikePinType) },
      { key: "ピンの長さ", result: this.spike1.fields.spikePinLength + "mm" },
    ];
    },

    makeParameter2(){
      var spikeWeight2 = this.spike2.fields.spikeWeight;
      var spikeWidth2 = this.spike2.fields.spikeWidth;
      var spikeAngle2 = this.spike2.fields.spikeAngle;
      var spikespikeGlip2 = this.spike2.fields.spikeGlip;
      var spikeResilience2 = this.spike2.fields.spikeResilience;
      this.parameter2 = [
        spikeWeight2,
        spikeWidth2,
        spikeAngle2,
        spikespikeGlip2,
        spikeResilience2,
        ];
    },

    makeTable2(){
      this.table2 = [
        { key: "定価", result: this.spike2.fields.spikePrice + "円" },
        { key: "重さ", result: this.spike2.fields.spikeWeightNumber + "g" },
        { key: "対応種目", result: String(this.spike2.fields.spikeEvent) },
        { key: "対応環境", result: String(this.spike2.fields.spikeEnvironment) },
        {
          key: "サイズ",
          result: this.spike2.fields.spikeMinSize + "〜" + this.spike2.fields.spikeMaxSize,
        },
        { key: "アッパー素材", result: this.spike2.fields.spikeUpperMaterial },
        { key: "ソール素材", result: this.spike2.fields.spikeSoleMaterial },
        { key: "ピンの種類", result: String(this.spike2.fields.spikePinType) },
        { key: "ピンの長さ", result: this.spike2.fields.spikePinLength + "mm" },
      ];
    },

  },
});
</script>

<style>
.compareTitle {
  margin: 10vw 5vw;
  padding: 2vw;
  font-size: 6vw;
  font-weight: bold;
  color: #327CBE;
  text-align: center;
  border-bottom: 2px solid #327CBE;
}
.compareSelectCon {
  display: flex;
}
.compareSelect1, .compareSelect2{
  display: inline-block;
  width: 44vw;
  margin: 0px 2vw;
}
.spikeImgBox {
  height: 17vw;
  box-shadow: 2px 2px 8px -4px #000000;
  margin: 2vw 3vw;
}
.compareSpikeImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.compareSelect1 .spikeSelect {
  background: url(../assets/img/original-shoe.png) no-repeat center center;
}
.compareSelect2 .spikeSelect {
  background: url(../assets/img/hikaku-shoe.png) no-repeat center center;
}


.spikeInfoTable , .spikeInfoTable2{
  border-collapse: separate;
  border-spacing: 10px 30px;
}
.spikeInfoTable thead,
.spikeInfoTable2 thead {
  display: none;
}
.spikeInfoTable td,
.spikeInfoTable2 td {
  display: block;
  word-break : break-all;
}
.spikeInfoTable tr td:nth-child(1) {
  color: #327CBE;
  font-weight: bold;
}
.spikeInfoTable tr td:nth-child(1):after {
  content: "";
  width: 85vw;
  height: 2px;
  display: block;
  position: absolute;
  background-color: #327CBE;
}
td:nth-child(2) {
  width: 44vw;
  height: 13vh;
}
.spikeInfoTable2 td:nth-child(1) {
  visibility: hidden;
}
/* btn */
.InfoBtnBox {
  text-align: center;
}
.spikeInfoBtn {
  width: 40vw;
  height: 40px;
  color: white;
  border-radius: 0.25rem;
}
</style>
