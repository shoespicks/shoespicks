<template>
  <div class="container">
    <!-- 井口貴文開発中 -->
    <!-- フィルター -->
    <!-- Cards -->
    <b-form @submit="submit">
      <b-form-group>
        <b-form-input type="text" v-model="form.name" placeholder="スパイクで検索"></b-form-input>
      </b-form-group>
      <!-- １. 表示順を変更する -->
      <b-form-group label="価格">
        <b-form-radio-group
          v-model="form.name"
          :options="price"
          class="mb-3"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group label="軽さ">
        <b-form-radio-group
          v-model="form.name"
          :options="weight"
          class="mb-3"
          value-field="item"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>

      <!-- 2. 絞り込む -->
      <!-- <b-form-group label="新着">
        <b-form-checkbox-group
          v-model="form.spike"
          :options="spike"
          name="新着"
        ></b-form-checkbox-group>
      </b-form-group> -->

      <b-btn type="submit">検索</b-btn>
    </b-form>

    <p v-for="spike in spikes" @click="$nuxt.$router.push(spike.fields.id)">
      {{ spike.fields.spikeTitle }}
    </p>

    <h2 class="maker">アシックス</h2>

    <div class="flex">
      <b-card
        　v-for="spike in spikes"
        :title="spike.fields.spikeTitle"
        img-alt="Image"
        style="max-width: 50%"
        tag="article"
      >
        <b-img :src="spike.fields.spikePhoto[0].fields.file.url" fluid-grow alt="スパイク画像">
        </b-img>
        <b-badge variant="gray">
          <p>¥{{ spike.fields.spikePrice }}</p>
        </b-badge>
      </b-card>
    </div>
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
        price: [],
        weight: [],
        width: [],
        resilience: [],
        angle: [],
        grip: [],
      },
      spikeId: 0,
      spikes: [],
      price: [
        { item: "A", name: "安い順" },
        { item: "B", name: "高い順" },
      ],
      weight: [
        { item: "C", name: "軽い順" },
        { item: "D", name: "重い順" },
      ],
      width: [
        { item: "C", name: "広い順" },
        { item: "D", name: "狭い順" },
      ],
      resilience: [
        { item: "C", name: "高い順" },
        { item: "D", name: "低い順" },
      ],
      angle: [
        { item: "C", name: "高い順" },
        { item: "D", name: "低い順" },
      ],
      grip: [
        { item: "C", name: "高い順" },
        { item: "D", name: "低い順" },
      ],
    };
  },
  methods: {
    //   const searchInput: { [key: string]: string } = {
    //     content_type: "track",
    //     "fields.alias[match]": this.form.name,
    //   };
    //   if (this.form.areas.length > 0) {
    //     searchInput["fields.area[in]"] = this.form.areas.join(",");
    //   }
    //   if (this.form.events.length > 0) {
    //     searchInput["fields.events[all]"] = this.form.events.join(",");
    //   }
    submit(e: Event) {
      console.log("submit");
      e.preventDefault();

      const searchInput: { [key: string]: string } = {
        content_type: "spike",
        // "fields.spikeEvent": this.form.name,
        // - を入れると降順になる
        order: "-fields.spikeWeight",
      };

      contentfulClient.getEntries(searchInput).then((e: any) => {
        e.items?.forEach((item: any, index: number) => {
          console.log(index + "つめ");
          console.log(item);
        });

        this.spikes = e.items;
      });
    },
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  /* display: flex;
  justify-content: center; */
  align-items: center;
  text-align: center;
}
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
  display: inline-block;
  border-radius: 10px;
}
</style>
