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
      <!-- <b-form-group label="軽さ">
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
      </b-form-group> -->
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
          <!-- <h2 class="maker">{{ spike.fields.spikeMaker }}</h2> -->

            <b-card
              　v-for="spike in spikes"
              @click="$nuxt.$router.push(`/${spike.fields.id}`)"
              :title="spike.fields.spikeTitle"
              img-alt="Image"
              tag="article"
            >
              <b-img
                :src="spike.fields.spikePhoto[0].fields.file.url"
                style="width: 40vw;"
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
  spikes: String;
}

export default Vue.extend({
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
      // ＆＆前半の読み方：　queryがtrueならの二重否定なのでtrue
      // ＆＆後半の読み方：　/^\s+$/.test(this.query)　→先頭から末尾にかけて一つ以上ある空白がqueryにあるかチェックします。あればtrue。それの！(否定)なので、空白がなければtrue
      return !!(this as any).query && !/^\s+$/.test((this as any).query)
           || !(this as any).query && !/^\s+$/.test((this as any).query);
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
        var loadingInput: { [key: string]: string } = {
          content_type: "spike",
        };

      // こだわり検索
      const displayOrder = () => {
        // １　価格順
        if (this.query.match("高い順")) {
          loadingInput["order"] = "-fields.spikePrice";
        } 
        else if (this.query.match("安い順")) {
          loadingInput["order"] = "fields.spikePrice";
        }
        // ２　重さ順
        if (this.query.match("重い順")) {
          loadingInput["order"] = "-fields.spikeWeightNumber";
        } 
        else if (this.query.match("軽い順")) {
          loadingInput["order"] = "fields.spikeWeightNumber";
        }
        // ３　反発性順
        if (this.query.match("強い順")) {
          loadingInput["order"] = "-fields.spikeResilience";
        } 
        else if (this.query.match("弱い順")) {
          loadingInput["order"] = "fields.spikeResilience";
        }
        // ４　反り順
        if (this.query.match("鋭角順")) {
          loadingInput["order"] = "-fields.spikeAngle";
        } 
        else if (this.query.match("鈍角順")) {
          loadingInput["order"] = "fields.spikeAngle";
        }
        // ５　広さ順
        if (this.query.match("広い順")) {
          loadingInput["order"] = "-fields.spikeWidth";
        } 
        else if (this.query.match("狭い順")) {
          loadingInput["order"] = "fields.spikeWidth";
        }
        // 6　グリップ順
        if (this.query.match("グリップ性高い順")) {
          loadingInput["order"] = "-fields.spikeGlip";
        } 
        else if (this.query.match("グリップ性低い順")) {
          loadingInput["order"] = "fields.spikeGlip";
        }
      }

      // 種目検索＋メーカー検索条件分岐
      var words = this.query.split(' ');
      console.log("みちゃんの両乳出たよ！！！");
        console.log(this.query);
        loadingInput["fields.spikeCategory[match]"] = words[0];
        loadingInput["fields.spikeMaker[match]"] = words[1];
        displayOrder();

      await contentfulClient
           .getEntries(loadingInput)
          .then(({ items }: { items: any }) => (this.spikes = items))
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
</script>