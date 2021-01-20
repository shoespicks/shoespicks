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
      <b-form>
        <!-- 2. 絞り込む -->
        <b-form-select
          v-model="events"
          :options="options"
          >
        </b-form-select>
        <!-- <b-form-select name="" id="">
          <template #first>
            <b-form-select-option :value="null" disabled>こだわり</b-form-select-option>
          </template>
          <b-form-select-option value="C">価格</b-form-select-option>
          <b-form-select-option value="C">反発</b-form-select-option>
          <b-form-select-option value="C">軽さ</b-form-select-option>
        </b-form-select> -->

<!-- console.log('afterEach起動成功！！'); -->
       <b-btn @click="$nuxt.$router.push({
          name: 'spikeSearch',
          params: {
            user_code: events
          }
        }).catch(() => {})">検索
       </b-btn>
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
      events: null,
      options: [
        { value: null, text: '種目', disabled: true},
          {
            label: '短距離',
            options: [
              { value: '100m', text: '100m' },
              { value: '200m', text: '200m' },
              { value: '400m', text: '400m' },
              { value: '110mH', text: '110mH' }
            ]
          },
          {
            label: '中距離',
            options: [
              { value: '800m', text: '800m' },
              { value: '1500m', text: '1500m' },
            ]
          },
          {
            label: '長距離',
            options: [
              { value: '3000m', text: '3000m' },
              { value: '5000m', text: '5000m' },
              { value: '10000m', text: '10000m' },
            ]
          },
        ]
    };
  },
});
</script>
