<template>
  <div class="container">

    <section class="topView">
      <h1>シューズ選びにこだわりを</h1>
    </section>

    <section class="topSearchBar">
      <!-- やり方 -->
      <!-- 検索バーと同じ作り方でできそう。検索ボタン押した後は、spikeSearch.vueに跳ぶ（スパイク一覧ページ） -->
      <!-- <p @click="$nuxt.$router.push('spikeSearch')">
        <b-btn>検索する</b-btn>
      </p> -->
      <b-form @submit.prevent="submit">
        <!-- 2. 絞り込む -->
        <b-form-select 
          v-model="events"
          :options="options">
        </b-form-select>
          <!-- <b-form-checkbox-group
            v-model="form.status"
            :options="status"
            name="status"
          ></b-form-checkbox-group> -->
       <b-btn type="submit">検索</b-btn>
      </b-form>
    </section>

    <section class="commonlySeen">
      <!-- やりかた -->
      <!-- よく検索されているスパイクを上位５つくらい表示する
      おそらくsys.date　的なやつで検索履歴に残っているやつでできる気がする -->
      <h2>よく見られているスパイク | 短距離</h2>
      <h2>よく見られているスパイク | 中距離</h2>
    </section>

    <section class="howToUse">
      <h2>このサイトの使い方</h2>
      <!-- ただのHTML -->
    </section>

  </div>
</template>

<script lang="ts">
import { contentfulClient } from "~/plugins/contentful";
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      spikes: [],
      events: [],
      options: [
          { value: '100m', text: "100m" },
          { value: '200m', text: "200" },
          { value: '110mh', text: "110mハードル" },
          { value: '400m', text: "400m" },
        ]
    };
  },
});
</script>
