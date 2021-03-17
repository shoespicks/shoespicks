<template>
  <div>
    <section class="topView">
      <h1>シューズ選びにこだわりを</h1>
    </section>

    <section class="topSearchBar">
      <b-form>
        <TopSearchForm></TopSearchForm>
      </b-form>
    </section>

    <section class="commonlySeen">
      <!-- やりかた -->
      <!-- よく検索されているスパイクを上位５つくらい表示する
      おそらくsys.date　的なやつで検索履歴に残っているやつでできる気がする -->
      <h2 class="textBlueM">よく見られているスパイク | 短距離</h2>
    </section>
    <section class="searchEvent">
      <div class="searchTrack">
        <h2 class="textBlueM">種目から探す | トラック</h2>
        <div class="searchEventCon">
          <div class="eventBox">
            <div class="eventImg eventSprint"></div>
            <p class="eventText">短距離<br><span>（100m〜400m）</span></p>
          </div>
          <div class="eventBox">
            <div class="eventImg eventMiddle"></div>
            <p class="eventText">中距離<br><span>（800m〜1500m）</span></p>
          </div>
          <div class="eventBox">
            <div class="eventImg eventLong"></div>
            <p class="eventText">長距離<br><span>（3000m〜）</span></p>
          </div>
        </div>
      </div>
      <div class="searchField">
        <h2 class="textBlueM">種目から探す | フィールド</h2>
        <div class="searchEventCon">
          <div class="eventBox">
            <div class="eventImg eventLongJump"></div>
            <p class="eventText">走幅跳 | 三段跳</p>
          </div>
          <div class="eventBox">
            <div class="eventImg eventHighJump"></div>
            <p class="eventText">走高跳 | 棒高跳</p>
          </div>
          <div class="eventBox">
            <div class="eventImg eventThrow"></div>
            <p class="eventText">投擲</p>
          </div>
        </div>
      </div>
    </section>

    <section class="howToUse">
      <h2 class="textBlueL">このサイトの特徴</h2>
      <!-- ただのHTML -->
      <div class="stepCon">
        <h3 class="textBlueM">①種目やこだわり、メーカーなどでカンタン検索</h3>
        <div class="stepbox">
          <img src="@/assets//img/top/feature1.png" alt="画像が入るよ" />
          <!-- <p>
            種目、メーカー、表示順を選んでカンタンに陸上スパイクを検索。<br /><br />
            検索できるこだわり<br />
            価格/重さ/足幅/反発性/グリップ性/ソールの傾斜
          </p> -->
        </div>
      </div>
      <div class="stepCon">
        <h3 class="textBlueM">②ランキング形式でわかりやすい</h3>
        <div class="stepbox">
          <img src="@/assets//img/top/feature2.png" alt="画像が入るよ" />
          <!-- <p>
            カンタン検索でこだわりランキング形式に表示し、あなたにおすすめな陸上スパイクを用意に発見。初心者向けスパイクや土用スパイクも絞り込み可能。
          </p> -->
        </div>
      </div>
      <div class="stepCon">
        <h3 class="textBlueM">③有名選手のレビューや口コミが満載！</h3>
        <div class="stepbox">
          <img src="@/assets//img/top/feature3.png" alt="画像が入るよ" />
          <!-- <p>
            日本トップクラスの陸上選手に聞いたスパイクのレビューや、各スパイクへの口コミも充実。<br />
            無料会員登録することで閲覧可能になります。
          </p> -->
        </div>
      </div>
      <div class="stepCon">
        <h3 class="textBlueM">④グラフでカンタンに性能比較</h3>
        <div class="stepbox">
          <img src="@/assets//img/top/feature4.png" alt="画像が入るよ" />
          <!-- <p>
            気になるスパイクの性能を他のスパイクとカンタンに比較可能。<br />
            次のスパイクがどんなスパイクなのか、まずはご自分のスパイクと比べてみましょう。
          </p> -->
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
  background: url(../assets/img/top/greate-pretender.jpg) no-repeat center center;
  background-size: cover;
  color: white;
  margin-bottom: 25vw;
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
.commonlySeen, .searchEvent {
  padding: 10vw 3vh 10vw;
}

/* section 4 */
.searchEventCon {
  display: flex;
  justify-content: center;
  margin-bottom: 5vw;
}
.eventBox { margin: 0 1vw; }
.eventImg {
  width: 30vw;
  height: 30vw;
  background-color: black;
  padding: 10%;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  background-position: center center !important;
  background-size: cover !important;
}
.eventSprint{ background: url(../assets/img/top/eventSprint.png)no-repeat; }
.eventMiddle { background: url(../assets/img/top/eventMiddle.png)no-repeat; }
.eventLong { background: url(../assets/img/top/eventLong.png)no-repeat; }
.eventLongJump{ background: url(../assets/img/top/eventLongJump.png)no-repeat; }
.eventHighJump{ background: url(../assets/img/top/eventHighJump.jpg)no-repeat; }
.eventThrow{ background: url(../assets/img/top/eventThrow.png)no-repeat; }

.eventText{
  font-size: 3.5vw;
  margin-top: 2vw;
  text-align: center;
  line-height: 4vw;
}
.eventText span {
  font-size: 1.5vw;
}

/* section 5 */
/*  このサイトの使い方の文字色　#437BB9 */
.howToUse {
  padding: 0 3vh 0;
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
