<template>
  <div>
    <!-- ////////////ログイン機能検証//////////// -->
    <p v-if="user.login" class="text">ログインに成功！！！！！！！！うんこ！</p>
    <p v-else class="text">ログインしてないよ</p>
    <!-- ////////////ログイン機能検証//////////// -->
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
        <CopySearchForm></CopySearchForm>
        <!-- <b-form-select name="" id="">
          <template #first>
            <b-form-select-option :value="null" disabled>こだわり</b-form-select-option>
          </template>
          <b-form-select-option value="C">価格</b-form-select-option>
          <b-form-select-option value="C">反発</b-form-select-option>
          <b-form-select-option value="C">軽さ</b-form-select-option>
        </b-form-select> -->
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
import CopySearchForm from "@/components/Atom/copy-searchForm.vue";

export default Vue.extend({
  components: {
    CopySearchForm,
  },
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
});
</script>
