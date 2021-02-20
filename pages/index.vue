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
        <TopSearchForm></TopSearchForm>
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
          <img src="@/assets//img/test-asobi/bakeru1.png" alt="画像が入るよ" />
          <p>
            種目、メーカー、表示順を選んでカンタンに陸上スパイクを検索。<br /><br />
            検索できるこだわり<br />
            価格/重さ/足幅/反発性/グリップ性/ソールの傾斜
          </p>
        </div>
      </div>
      <div class="stepCon">
        <h3>②あなたにおすすめなスパイクをランキング表示</h3>
        <div class="stepbox">
          <img src="@/assets//img/test-asobi/bakeru2.png" alt="画像が入るよ" />
          <p>
            カンタン検索でこだわりランキング形式に表示し、あなたにおすすめな陸上スパイクを用意に発見。初心者向けスパイクや土用スパイクも絞り込み可能。
          </p>
        </div>
      </div>
      <div class="stepCon">
        <h3>③有力選手の評価レビューや口コミが満載</h3>
        <div class="stepbox">
          <img src="@/assets//img/test-asobi/bakeru3.png" alt="画像が入るよ" />
          <p>
            日本トップクラスの陸上選手に聞いたスパイクのレビューや、各スパイクへの口コミも充実。<br />
            無料会員登録することで閲覧可能になります。
          </p>
        </div>
      </div>
      <div class="stepCon">
        <h3>④グラフでカンタンにスパイク性能比較</h3>
        <div class="stepbox">
          <img src="@/assets//img/test-asobi/bakeru4.png" alt="画像が入るよ" />
          <p>
            気になるスパイクの性能を他のスパイクとカンタンに比較可能。<br />
            次のスパイクがどんなスパイクなのか、まずはご自分のスパイクと比べてみましょう。
          </p>
        </div>
      </div>

      <b-btn class="searchBtn">まずはスパイクを検索!</b-btn>
    </section>
  </div>
</template>

<script lang="ts">
import { contentfulClient } from "~/plugins/contentful";
import Vue from "vue";
import TopSearchForm from "@/components/Atom/TopSearchForm.vue";

export default Vue.extend({
  components: {
    TopSearchForm,
  },
});
</script>

<style>
/* section 1 */
.topView {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
  background-color: gray;
  background: url(../assets/img/test-asobi/davis.png) no-repeat center center;
  color: black;
}
.topView h1 {
  font-weight: 900;
  font-size: 1.5rem !important;
}
/* section 2 */
.topSearchBar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  background-color: white;
  padding: 10%;
  margin: 0 auto;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.menuFormCon {
  display: flex;
}
.batsu {
  display: block;
  width: 25px;
  height: 30px;
  position: relative;
  margin: 1vh auto 0;
}
.batsu::before,
.batsu::after {
  content: "";
  display: block;
  width: 100%; /*バツ線の長さ*/
  height: 6px; /*バツ線の太さ*/
  background: #9a9a9a;
  transform: rotate(45deg);
  transform-origin: 0% 50%;
  position: absolute;
  top: calc(14% - 5px);
  left: 14%;
}
.batsu::after {
  transform: rotate(-45deg);
  transform-origin: 100% 50%;
  left: auto;
  right: 14%;
}

/* section 3 */
.commonlySeen {
  padding: 43vw 3vh 10vw;
}
.commonlySeen h2 {
  font-size: 2.5vh;
}

/* section 4 */
/*  このサイトの使い方の文字色　#437BB9 */
.howToUse {
  padding: 0 3vh 0;
}
.howToUse h2 {
  font-size: 4vh;
  color: #437bb9;
  font-weight: bold;
  text-align: center;
}
.stepCon {
  margin: 15vw 0;
}
.stepbox img {
  width: 90vw;
}

.searchBtn {
  display: block;
  color: white !important;
  background-color: #007fff;
  margin: 3vw auto;
  border-color: #007fff;
  padding: 1vh 10vw;
}
</style>
