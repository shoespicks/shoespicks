<template>
  <div>
    <b-form @submit.prevent="submit">
      <b-form-group>
        <b-form-input type="text" v-model="form.name" placeholder="スパイクで検索" autofocus></b-form-input>
      </b-form-group>
      <!-- 井口貴文開発中 -->
      <!-- １. 表示順を変更する -->
      <b-form-group label="価格">
        <b-form-radio-group
          v-model="form.sort.price"
          :options="price"
          class="mb-3"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>
      <!-- <b-form-group label="軽さ">
        <b-form-radio-group
          v-model="form.sort.weight"
          :options="weight"
          class="mb-3"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group> -->
      <!-- 2. 絞り込む -->
      <b-form-group label="絞り込む">
        <b-form-checkbox-group
          v-model="form.status"
          :options="status"
          name="status"
        ></b-form-checkbox-group>
        <b-form-checkbox-group
          v-model="form.target"
          :options="target"
          name="target"
        ></b-form-checkbox-group>
        <b-form-checkbox-group
          v-model="form.environment"
          :options="environment"
          name="environment"
        ></b-form-checkbox-group>
        <b-form-checkbox-group
          v-model="form.events"
          :options="events"
          name="events"
        ></b-form-checkbox-group>
      </b-form-group>
      <b-btn type="submit">検索</b-btn>
    </b-form>

    <v-col cols="12">
      <!-- ロード中のアニメーション -->
      <!-- <template v-if="loading">
        <div class="text-center">
          <v-progress-circular indeterminate color="grey" />
        </div>
      </template> -->
      <!-- 検索結果表示 -->
      <!-- <template v-else> -->
        <template v-if="spikes.length">
          <h2 class="maker">アシックス</h2>

          <div class="flex">
            <b-card
              　v-for="spike in spikes"
              @click="$nuxt.$router.push(spike.fields.id)"
              :title="spike.fields.spikeTitle"
              img-alt="Image"
              style="max-width: 50%"
              tag="article"
            >
              <b-img
                :src="spike.fields.spikePhoto[0].fields.file.url"
                fluid-grow
                alt="スパイク画像"
              >
              </b-img>
              <b-badge variant="gray">
                <p>¥{{ spike.fields.spikePrice }}</p>
              </b-badge>
            </b-card>
          </div>
          <h2 class="maker">ミズノ</h2>
          <h2 class="maker">アディダス</h2>
          <h2 class="maker">NB</h2>
          <h2 class="maker">NIKE</h2>
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
  spikes: any;
}

export default Vue.extend({
  data() {
    return {
      form: {
        name: "",
        status: [],
        target: [],
        environment: [],
        events: [],
        sort: {
          price: [],
          weight: [],
          width: [],
          resilience: [],
          angle: [],
          grip: [],
        }
      },
      spikeId: 0,
      spikes: [],
      status: [{ text: "新着", value: "新着" }],
      target: [{ text: "初心者", value: "初心者" }],
      environment: [{ text: "土兼用", value: "土兼用" }],
      events: [
        { text: "100m", value: "100m" },
        { text: "200m", value: "200m" },
        { text: "400m", value: "400m" },
      ],
      price: [
        { item: "L", name: "安い順" },
        { item: "H", name: "高い順" },
      ],
      weight: [
        { item: "L", name: "軽い順" },
        { item: "H", name: "重い順" },
      ],
      width: [
        { item: "H", name: "広い順" },
        { item: "L", name: "狭い順" },
      ],
      resilience: [
        { item: "H", name: "高い順" },
        { item: "L", name: "低い順" },
      ],
      angle: [
        { item: "H", name: "高い順" },
        { item: "L", name: "低い順" },
      ],
      grip: [
        { item: "C", name: "高い順" },
        { item: "D", name: "低い順" },
      ],
    };
  },
  methods: {
    submit(e: Event) {
      e.preventDefault();

      // 機能０ 検索窓で検索する
      var searchInput: { [key: string]: string } = {
        content_type: "spike",
        "fields.alias[match]": this.form.name,
      };
      // 機能１　並び替え
      //  for(var key in grip) {
      //       console.log(key);
      //     }
      // Object.keys(sort).forEach(function (value){
      //   console.log(value + ":" + this[value]);
      // }, sort)

      // for (let i = 0; i < this.form.sort.price.length; i++) {

      // }
      // サンプル３
      for (var key in this.form.sort) {
        console.log("このKEYは： " + key);
        var arr = "this.form.sort." + key + "[0]";
        console.log("この総合arrは： " + arr);
        if (arr == "H") {
          searchInput["order"] = "-fields.spikePrice";
        }
        else if (arr == "L") {
          searchInput["order"] = "fields.spikePrice";
        }
      }
      // サンプル２
      // Object.keys(this.form.sort).forEach(function (value){
      //   console.log(value + ":" + [value]);
      //   if (form.sort.value == "H") {
      //     searchInput["order"] = "-fields.spikePrice";
      //   }
      //   else if (value == "L") {
      //     searchInput["order"] = "fields.spikePrice";
      //   }
      // }, this.form.sort)

      // サンプル１
        // if (this.form.sort.price[0] == "H") {
        //   searchInput["order"] = "-fields.spikePrice";
        // }
        // else if (this.form.sort.price[0] == "L") {
        //   searchInput["order"] = "fields.spikePrice";
        // }

      // 機能２　絞り込む　チェックボックスで選ばれたものを検索する
      if (this.form.status.length > 0) {
        // form.statusに入っているvalueを連結して、代入する
        searchInput["fields.spikeStatus[all]"] = this.form.status.join(",");
      }
      if (this.form.target.length > 0) {
        searchInput["fields.spikeTarget[all]"] = this.form.target.join(",");
      }
      if (this.form.environment.length > 0) {
        searchInput["fields.spikeEnvironment[all]"] = this.form.environment.join(",");
      }
      if (this.form.events.length > 0) {
        searchInput["fields.spikeEvent[all]"] = this.form.events.join(",");
      }
      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          console.log(item);
        });
        this.spikes = e.items;
      });
    },
  },
});
</script>

<style>
.flex {
  display: flex;
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
.maker {
  padding: 15px 20px;
  background-color: #0038c9;
  border: 1px;
  color: white;
  display: block;
  border-radius: 10px;
}
</style>
