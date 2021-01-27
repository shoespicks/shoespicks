<template>
  <div> 
    <b-form @submit.prevent="submit">
      <b-form-group>
        <b-form-input 
        　　type="text"
        　　v-model="query"
        　　placeholder="スパイクで検索"
        　　autofocus>
        </b-form-input>
      </b-form-group>
      <!-- 井口貴文開発中 -->
      <!-- １. 表示順を変更する -->
      <b-form-group label="価格">
        <b-form-radio-group
          v-model="form.sort.price"
          :options="price"
          class="mb-2"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group label="軽さ">
        <b-form-radio-group
          v-model="form.sort.weight"
          :options="weight"
          class="mb-2"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group label="広さ">
        <b-form-radio-group
          v-model="form.sort.width"
          :options="width"
          class="mb-2"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>
      <!-- <b-form-group label="反発">
        <b-form-radio-group
          v-model="form.sort.resilience"
          :options="resilience"
          class="mb-2"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group label="角度">
        <b-form-radio-group
          v-model="form.sort.angle"
          :options="angle"
          class="mb-2"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group label="グリップ性">
        <b-form-radio-group
          v-model="form.sort.grip"
          :options="grip"
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
        <div>propsのitemは　 {{ user_code }}　です</div>
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
  props: {
    user_code: String
  },
  data() {
    return {
      query: "",

      loading: false,
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
        { item: "H", name: "高い順" },
        { item: "L", name: "低い順" },
      ],
    };
  },
  computed: {
    isRequired() {
      return !!this.query && !/^\s+$/.test(this.query);
    },
  },
  watch: {
    "$route.query.q": {
      handler(newVal) {
        this.query = newVal;
        // クエリーが投げられた一番最初
        this.getPosts();
      },
      immediate: true,
    },
  },
  methods: {
     async getPosts() {
      // 空白時に検索しない条件式
      if (this.isRequired) {
        this.loading = true;
        await contentfulClient
          .getEntries({
            content_type: "spike",
            query: this.query,
          })
          .then(({ items }) => (this.spikes = items))
          .catch(console.error);
        this.loading = false;
      }
    },
    submit(e: Event) {
      e.preventDefault();
      // 機能０ 検索窓で検索する
      var searchInput: { [key: string]: string } = {
        content_type: "spike",
        "fields.alias[match]": this.query,
      };
      // 機能１　並び替え
      // サンプル1
      // for (var key in this.form.sort) {
      //   if ( arr == "H") {
      //     searchInput["order"] = "-fields.spikePrice";
      //     console.log("Hが正常に出たよ！");
      //   }
      //   else if ( arr == "L") {
      //     searchInput["order"] = "fields.spikePrice";
      //   }
      //   console.log("失敗しね！！" + arr);
      // }
      
      // サンプル2
      if (this.form.sort.price[0] == "H") {
        searchInput["order"] = "-fields.spikePrice";
      }
      else if (this.form.sort.price[0] == "L") {
        searchInput["order"] = "fields.spikePrice";
      }

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

if (process.browser) {
  window.onload = function () {
    // console.log("ここのOnloadは機能したよ");
  //  submit()
  };
}
</script>