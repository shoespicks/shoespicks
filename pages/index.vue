<template>
  <div>
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
      <div class="stepCon">
        <h3>①陸上スパイクをカンタン検索</h3>
        <div class="stepbox">
          <img src="@/assets//img/test-asobi/bakeru1.png" alt="画像が入るよ">
          <p>種目、メーカー、表示順を選んでカンタンに陸上スパイクを検索。<br><br>
             検索できるこだわり<br>
             価格/重さ/足幅/反発性/グリップ性/ソールの傾斜</p>
        </div>
      </div>
      <div class="stepCon">
        <h3>②あなたにおすすめなスパイクをランキング表示</h3>
        <div class="stepbox">
          <img src="@/assets//img/test-asobi/bakeru2.png" alt="画像が入るよ">
          <p>カンタン検索でこだわりランキング形式に表示し、あなたにおすすめな陸上スパイクを用意に発見。初心者向けスパイクや土用スパイクも絞り込み可能。</p>
        </div>
      </div>
      <div class="stepCon">
        <h3>③有力選手の評価レビューや口コミが満載</h3>
        <div class="stepbox">
          <img src="@/assets//img/test-asobi/bakeru3.png" alt="画像が入るよ">
          <p>日本トップクラスの陸上選手に聞いたスパイクのレビューや、各スパイクへの口コミも充実。<br>
             無料会員登録することで閲覧可能になります。</p>
        </div>
      </div>
      <div class="stepCon">
        <h3>④グラフでカンタンにスパイク性能比較</h3>
        <div class="stepbox">
          <img src="@/assets//img/test-asobi/bakeru4.png" alt="画像が入るよ">
          <p>気になるスパイクの性能を他のスパイクとカンタンに比較可能。<br>
          次のスパイクがどんなスパイクなのか、まずはご自分のスパイクと比べてみましょう。</p>
        </div>
      </div>

      <b-btn class="searchBtn">まずはスパイクを検索!</b-btn>
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
});
</script>
