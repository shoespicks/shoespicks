<template>
  <div class="container">
    <p @click="$nuxt.$router.push('spikeSearch')">
      <b-btn>検索する</b-btn>
    </p>

    <section class="topView">
      <h1>シューズ選びにこだわりを</h1>
    </section>

    <section class="topSearchBar">
      <!-- やり方 -->
      <!-- 検索バーと同じ作り方でできそう。検索ボタン押した後は、spikeSearch.vueに跳ぶ（スパイク一覧ページ） -->
      <p @click="$nuxt.$router.push('spikeSearch')">
        <b-btn>検索する</b-btn>
      </p>
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
    };
  },
});
</script>
