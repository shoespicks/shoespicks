<template>
  <div>
    <!-- タイトル -->
    <div class="spikeListSection1">
      <p>{{spikeCategoryJpn}}スパイク｜{{brandName}}</p>
    </div>

    <!-- 種目チェックボックス -->
    <div class="eventCheckBox">
        <b-form-radio-group @change="submit" v-model="spikeEvent" :options="eventListShortsprint" class="mb-3" value-field="value" text-field="text">
        </b-form-radio-group>
    </div>

    <!-- 絞り込み -->
    <div class="termsCheckBox">
        <b-form-checkbox-group @change="submit" v-model="spikeTerms" :options="termsList" class="mb-3" value-field="value" text-field="text">
        </b-form-checkbox-group>
    </div>

    <!-- 表示順序順序プルダウン -->
    <b-form-select v-model="favorite" :options="options"> </b-form-select>
    
    <!-- スパイクカード -->
    <v-col cols="12">
      <template v-if="spikes.length">
        <b-card
          　v-for="spike in spikes"
          @click="$nuxt.$router.push(`/spikeList/${spikeCategory}/${spike.fields.id}`)"
          :title="spike.fields.spikeTitle"
          img-alt="Image"
          tag="article"
        >
          <b-img
            :src="spike.fields.spikePhoto[0].fields.file.url"
            style="width: 40vw"
            alt="スパイク画像"
          >
          </b-img>
          <b-badge variant="gray">
            <p>価格：¥{{ spike.fields.spikePrice }}</p>
            <p>重さ：{{ spike.fields.spikeWeightNumber }}g</p>
            <p>反発：{{ spike.fields.spikeResilience }}pw</p>
            <p>反り：{{ spike.fields.spikeAngle }}角度</p>
            <p>広さ：{{ spike.fields.spikeWidth }}cm</p>
            <p>グリップ：{{ spike.fields.spikeGlip }}</p>
          </b-badge>
        </b-card>
      </template>
      <template v-else>
        <v-list-item class="justify-center">
          <div class="text-center">
            <p>検索結果{{ spikes.length }}件</p>
            <p>キーワードに一致する投稿がありません。</p>
            <v-icon> mdi-emoticon-cry-outline </v-icon>
          </div>
        </v-list-item>
      </template>
      <!-- </template> -->
    </v-col>
  </div>
</template>

<script lang="ts">
import { contentfulClient } from "~/plugins/contentful";
import Vue from "vue";

interface Data {
  queryValue: any,
  spikes: any,
  spikeId: any,
  spikeCategory: any,
  spikeCategoryJpn: any,
  brandName: any,
  favorite:any,
  options: any,
  eventListShortsprint:any;
  spikeTerms: any;
  termsList: any;
  spikeEvent: any;
}

export default Vue.extend({
  data():Data {
    return {
      queryValue: "",
      spikeId: 0,
      spikes: [],
      eventListShortsprint:["100m","200m","400m","110mH","400mH"],
      spikeCategory: null,
      spikeCategoryJpn:null,
      brandName: this.$route.query.brandName,
      favorite: this.$route.query.favorite,
      options: [
        { value: null, text: "表示順", disabled: true },
        { value: "fields.spikePrice", text: "価格｜安い順"},
        { value: "-fields.spikePrice", text: "価格｜高い順" },
        { value: "fields.spikeWeightNumber",  text: "重さ｜軽い順" },
        { value: "-fields.spikeWeightNumber", text: "重さ｜重い順" },
        { value: "fields.spikeResilience", text: "反発｜弱い順" },
        { value: "-fields.spikeResilience", text: "反発｜強い順" },
        { value: "-fields.spikeAngle", ext: "ソール傾斜｜シャープ順" },
        { value: "fields.spikeAngle", text: "ソール傾斜｜フラット順" },
        { value: "fields.spikeWidth", text: "足幅｜狭い順" },
        { value: "-fields.spikeWidth", text: "足幅｜広い順" },
        { value: "fields.spikeGlip", text: "グリップ性｜低い順" },
        { value: "-fields.spikeGlip", text: "グリップ性｜高い順" },
      ],
      spikeTerms: null,
      termsList: [
        { value: "初心者", text: "初心者"},
        { value: "土兼用", text: "土兼用"},
        { value: "ベルトなし", text: "ベルトなし"},
        { value: "ベルトあり", text: "ベルトあり"},
      ],
      spikeEvent: [],
    };
  },
  created: function(){
    this.spikeTerms = this.$route.query.spikeTerms;
    this.spikeEvent = this.$route.query.spikeEvent;
    //飛んできたページのスパイクカテゴリを取得
      this.spikeCategory = this.$route.params.category;

      var categoryList = {
        shortsprint: "短距離",
        midlesprint: "中距離",
        longsprint: "長距離",
        longjump: "走幅跳・三段跳",
        highjump: "走高跳・棒高跳",
        throw: "投擲"
      }

      this.spikeCategoryJpn = categoryList[this.spikeCategory];
      this.brandName = this.$route.query.brandName;
      this.favorite = this.$route.query.favorite; 

      // var searchInput: { [key: string]: string } = {
      //   content_type: "spike",
      //   "fields.spikeCategory[match]": this.spikeCategoryJpn,
      //   "fields.spikeMaker[match]": this.brandName,
      //   order: this.favorite,
      //   };
      // contentfulClient.getEntries(searchInput).then((e: any) => {
      //   e.items?.forEach((item: any, index: number) => {});
      //   this.spikes = e.items;
      //   });


      var searchInput: { [key: string]: string } = {
        content_type: "spike",
        "fields.spikeCategory[match]": this.spikeCategoryJpn,
        "fields.spikeMaker[match]": this.brandName,
        order: this.favorite,
        };
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});
        this.spikes = e.items;
        });

        
  },


  computed: {
    isRequired() {
      // ＆＆前半の読み方：　queryがtrueならの二重否定なのでtrue
      // ＆＆後半の読み方：　/^\s+$/.test(this.query)　→先頭から末尾にかけて一つ以上ある空白がqueryにあるかチェックします。あればtrue。それの！(否定)なので、空白がなければtrue
      return (
        (!!(this as any).query && !/^\s+$/.test((this as any).query)) ||
        (!(this as any).query && !/^\s+$/.test((this as any).query))
      );
    },
  },
  watch: {
    favorite:function(){
      


    },

    spikeEvent:function(){
      // this.queryValue = {brandName: String(this.brandName), spikeEvent:String(this.spikeEvent),}

    }


  },

  methods: {
    submit() {
      
      if(this.spikeTerms){
      var spikeTermsStr = this.spikeTerms.join(",");
      this.$router.push({query: { spikeTerms: String(spikeTermsStr)}});
      }

      if (this.spikeEvent){
        this.$router.push({query: { spikeEvent: String(this.spikeEvent)}});
      }

      if(spikeTermsStr != null && this.spikeEvent != null){
        var searchInput: { [key: string]: string } = {
        content_type: "spike",
        "fields.spikeCategory[match]": this.spikeCategoryJpn,
        order: this.favorite,
        "fields.spikeEvent[all]": this.spikeEvent,
        "fields.spikeTerms[all]": spikeTermsStr,
        // "fields.spikeEvent[all]": this.spikeEvent,
        };
      //↑のカテゴリのスパイクデータをcontentfulから取得、spikesに格納
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});
        this.spikes = e.items;
        });

      } else if(spikeTermsStr != null && this.spikeEvent == null){
        console.log("spikeTermsStrだけ");
        var searchInput: { [key: string]: string } = {
        content_type: "spike",
        "fields.spikeCategory[match]": this.spikeCategoryJpn,
        order: this.favorite,
        "fields.spikeTerms[all]": spikeTermsStr,
        };
      //↑のカテゴリのスパイクデータをcontentfulから取得、spikesに格納
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});
        this.spikes = e.items;
        });

      }else if(spikeTermsStr == null && this.spikeEvent != null){
        console.log("this.spikeEventだけ");
        var searchInput: { [key: string]: string } = {
        content_type: "spike",
        "fields.spikeCategory[match]": this.spikeCategoryJpn,
        order: this.favorite,
        "fields.spikeEvent[all]": this.spikeEvent,
        };
      //↑のカテゴリのスパイクデータをcontentfulから取得、spikesに格納
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {});
        this.spikes = e.items;
        });
      }
    },
  },
});
</script>

<style>
.flex {
  display: flex;
  flex-wrap: wrap;
}
.maker {
  padding: 15px 20px;
  background-color: #0038c9;
  border: 1px;
  color: white;
  display: block;
  border-radius: 10px;
}
</style>
