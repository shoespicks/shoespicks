<template>
  <div class="container spikeDetailInfo">
    <div>
      <h1 class="itemTitle textBlueM">
        {{ spike.fields.spikeMaker[0] }}<br />{{ spike.fields.spikeTitle }} 評価レビュー
      </h1>
      <v-carousel :show-arrows="false" hide-delimiter-background show-arrows-on-hover style="height: 66vw">
        <v-carousel-item
          v-for="(spikeImg, id) in spike.fields.spikePhoto"
          :key="id"
          :src="spike.fields.spikePhoto[id].fields.file.url"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <p class="taRight">参考価格：{{ spike.fields.spikePrice }}（税込）</p>
      <!-- <purchaseBtn :url="spike.fields.amazonURL"></purchaseBtn> -->
      <purchaseBtn :url="spike" class="spaceL"></purchaseBtn>
      <p class="spikeTopDesc">{{ spike.fields.spikeDescription }}</p>

    <barChart :parameter1="parameter1"></barChart>

    <!-- <NuxtLink to="/spikeCompare">
    <b-button pill variant="primary" @click="$nuxt.$router.compare">他の靴と比較する</b-button>
    </NuxtLink> -->
    <router-link :to="{ name: 'spikeCompare', query: { spikeName1: spike.fields.id } }">
      <b-button pill variant="outline-primary"
      class="compareBtn spaceL"
      @click="$nuxt.$router.compare"
        >他の靴と比較する</b-button
      >
      </router-link>
      <h2 class="textBlueL">基本情報</h2>

      <table class="basicInfo spaceL">
        <tbody>
          <tr>
            <td>定価</td>
            <td>{{ spike.fields.spikePrice }}円（税込）</td>
          </tr>
          <tr>
            <td>重さ</td>
            <td>片足{{ spike.fields.spikeWeightNumber }}（26cm）</td>
          </tr>
          <tr>
            <td>対応種目</td>
            <td>
              <span v-for="spikeEvent in spike.fields.spikeEvent" :key="spikeEvent">
                {{ spikeEvent }}/
              </span>
            </td>
          </tr>
          <tr>
            <td>サイズ</td>
            <td>{{ spike.fields.spikeMinSiza }}cm〜{{ spike.fields.spikeMaxSize }}cm</td>
          </tr>
          <tr>
            <td>対応環境</td>
            <td>{{ spike.fields.spikeEnvironment[0] }}</td>
          </tr>
          <tr>
            <td>アッパー素材</td>
            <td>{{ spike.fields.spikeUpperMaterial }}</td>
          </tr>
          <tr>
            <td>ソール素材</td>
            <td>{{ spike.fields.spikeSoleMaterial }}</td>
          </tr>
          <tr>
            <td>備考</td>
            <td>
              {{ spike.fields.spikePinLength[0] }}mm {{ spike.fields.spikePinType[0] }}
            </td>
          </tr>
        </tbody>
      </table>

      <purchaseBtn :url="spike.fields.amazonURL"
      class="spaceL"></purchaseBtn>
      <div>
        <b-card no-body class="tabs">
          <b-tabs card>
            <b-tab title="詳細" active>
              <b-card-text>
                <h2 class="textBlueL spaceL">一流選手に聞いてみた！</h2>
                <p v-if="!loginUser">ログインして一流選手のレビューを確認しよう</p>
                <div
                  v-if="loginUser"
                  class="blog-content spaceL"
                  v-html="$md.render(spike.fields.spikePlayerQuestion)"
                ></div>
                <h4 class="textBlueM">他にもこんな選手たちが愛用しています！</h4>
                <b-container fluid class="otherTopP">
                  <b-row>
                    <b-col>
                      <b-img
                        :src="spike.fields.spikePlayerListPhoto[0].fields.file.url"
                        fluid-grow
                        rounded="circle"
                        alt="Fluid-grow image"
                      ></b-img>
                      <p>{{ spike.fields.spikePlayerList[0] }}</p>
                    </b-col>
                    <b-col>
                      <b-img
                        :src="spike.fields.spikePlayerListPhoto[1].fields.file.url"
                        fluid-grow
                        rounded="circle"
                        alt="Fluid-grow image"
                      ></b-img>
                      <p>{{ spike.fields.spikePlayerList[1] }}</p>
                    </b-col>
                  </b-row>
                </b-container>

                <!-- <div class="otherTopP d-flex"></div> -->

                <h2 class="textBlueL">商品紹介</h2>
                <h3>アッパーについて</h3>
                <b-img
                  :src="spike.fields.spikeUpperPhotoNear.fields.file.url"
                  fluid
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeUpperDiscription1 }}</p>

                <b-img
                  :src="spike.fields.spikeUpperPhotoFar.fields.file.url"
                  fluid
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeUpperDescription2 }}</p>

                <h3>ソールについて</h3>
                <b-img
                  :src="spike.fields.spikeSolePhotoFar.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <b-img
                  :src="spike.fields.spikeSolePhotoNear.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeSoleDiscription }}</p>
                <b-img
                  :src="spike.fields.spikeAnglePhoto.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeAngleDiscription }}</p>

                <h2 class="textBlueL">こんな人にオススメ</h2>
                <p class="spaceL">{{ spike.fields.spikeRecomend }}</p>
                <purchaseBtn :url="spike.fields.amazonURL" class="spaceL"></purchaseBtn>
              </b-card-text>
            </b-tab>
            <b-tab title="口コミ">
              <div class="comment">
                <div v-if="!loginUser">
                  <b-btn style="background-color: #55acee" @click="loginWithTwitter">
                    twitterログイン
                  </b-btn>
                  <b-btn style="background-color: #3b5998" @click="loginWithFacebook">
                    Facebookログイン
                  </b-btn>
                  <b-btn style="background-color: #fff" @click="loginWithGoogle">
                    Googleログイン
                  </b-btn>
                  <p>ログインして口コミを確認しよう</p>
                </div>
                <div v-if="loginUser">
                  <p>{{ loginUser }}</p>
                  <p>{{ loginUser.prof }}</p>
                  <img width="50" height="50" :src="loginUser.iconUrl" alt="ユーザーアイコン" />
                  <b-btn @click="logout">ログアウト</b-btn>
                  <b-form @submit="submitComment">
                    <b-form-group>
                      <b-form-input
                        type="text"
                        v-model="commentBody"
                        placeholder="コメントを入力"
                      ></b-form-input>
                      {{ commentBody }}
                      <b-form-input
                        type="text"
                        v-model="commentName"
                        placeholder="コメントを入力"
                      ></b-form-input>
                      {{ commentName }}
                      <b-form-rating
                        v-model="starRate"
                        variant="warning"
                        class="mb-2"
                      ></b-form-rating>
                      {{ starRate }}
                    </b-form-group>
                    <b-btn type="submit">コメントする</b-btn>
                  </b-form>
                  <div v-for="comment in comments" :key="comment.id">
                    <p v-if="comment.user">
                      <img
                        width="50"
                        height="50"
                        v-if="comment.user.iconUrl"
                        :src="comment.user.iconUrl"
                      />
                      ユーザ名 : {{ comment.user.displayName }}
                      <span v-if="comment.user.accountName">@{{ comment.user.accountName }}</span>
                    </p>
                    <p>
                      評価 :
                      <b-form-rating
                        v-model="comment.starRate"
                        variant="warning"
                        readonly
                        inline
                        class="mb-2"
                      ></b-form-rating
                      ><br />
                      コメント : {{ comment.body }}<br />
                      投稿日時 : {{ comment.date }}<br />
                      コメント全部 : <br />
                      {{ comment }}
                    </p>
                  </div>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { contentfulClient } from "~/plugins/contentful";
import BarChart from "@/components/Molecule/BarChart.vue";
import purchaseBtn from "@/components/Atom/purchaseBtn.vue";
// import spikeCompareVue from "../spikeCompare.vue";
// 口コミ用
import { authStore } from "~/store/index";
import { commentStore } from "~/store/index";
import { CommentModel } from "~/store/types/commentEntity";

interface Data {
  spikeId: number;
  spike: any;
  commentBody: string;
  commentName: string;
  starRate: number;
  parameter1: any;
  parameter2: any;
}

export default Vue.extend({
  components: {
    BarChart,
    purchaseBtn,
  },
  data(): Data {
    return {
      spikeId: 0,
      spike: {},
      commentBody: "",
      commentName: "",
      starRate: 0,
      parameter1: [],
      parameter2: null,
    };
  },
  async asyncData({ payload, params }) {
    const spike = !!payload
      ? payload
      : await contentfulClient
          .getEntries({
            content_type: "spike",
            "fields.id": params.id,
          })
          .then((e: any) => {
            e.items?.forEach((item: any, index: number) => {
              console.log(index + "つめdayo");
              console.log(item);
            });

            return e.items[0];
          });

    return { spikeId: spike.sys.id, spike };
  },

  computed: {
    loginUser() {
      return authStore.user;
    },
    comments(): CommentModel[] | undefined {
      return commentStore.spikeComments(this.$data.spikeId);
      // return commentStore.allSpikeComments;
    },
  },
  created() {
    this.fetchComments();
    var spikeWeight1 = this.spike.fields.spikeWeight;
    var spikeWidth1 = this.spike.fields.spikeWidth;
    var spikeAngle1 = this.spike.fields.spikeAngle;
    var spikespikeGlip1 = this.spike.fields.spikeGlip;
    var spikeResilience1 = this.spike.fields.spikeResilience;
    this.parameter1 = [spikeWeight1, spikeWidth1, spikeAngle1, spikespikeGlip1, spikeResilience1];
    console.log(this.parameter1);
  },
  methods: {
    submitComment(e: Event) {
      e.preventDefault();
      // 空白でコメントしないためのif
      if (!!this.commentBody && !/^\s+$/.test(this.commentBody)) {
        commentStore
          .postSpikeComment({
            spikeId: this.spike.sys.id,
            commentBody: this.commentBody,
            commentName: this.commentName,
            starRate: this.starRate,
          })
          .then((response: any) => {
            // コメントした内容を一旦リセット
            this.commentBody = "";
            this.commentName = "";
            console.log(response);
          });
      }
    },

    fetchComments() {
      //
      // 【要対応】commentsのなかを一回からにする処理・・createed()のとこで一回取得しているから2回出てしまう
      //
      commentStore.fetchSpikeComments(this.spike.sys.id).then((comments) => {
        console.log("commentsだよー");
        console.log(comments);
      });
    },

    loginWithTwitter() {
      authStore
        .loginWithTwitter()
        .then((result) => {
          console.log("clientでも出す:twitter");
          console.log(result);
        })
        .catch((e) => {
          console.log("clientでもエラー出す:twitter");
        });
    },

    loginWithFacebook() {
      authStore
        .loginWithFacebook()
        .then((result) => {
          console.log("clientでも出す:Facebook");
          console.log(result);
        })
        .catch((e) => {
          console.log("clientでもエラー出す:Facebook");
        });
    },

    loginWithGoogle() {
      authStore
        .loginWithGoogle()
        .then((result) => {
          console.log("clientでも出す:Google");
          console.log(result);
        })
        .catch((e) => {
          console.log("clientでもエラー出す:Google");
        });
    },

    logout() {
      authStore.logout();
    },

    makeParameter1() {
      var spikeWeight1 = this.spike.fields.spikeWeight;
      var spikeWidth1 = this.spike.fields.spikeWidth;
      var spikeAngle1 = this.spike.fields.spikeAngle;
      var spikespikeGlip1 = this.spike.fields.spikeGlip;
      var spikeResilience1 = this.spike.fields.spikeResilience;
      this.parameter1 = [spikeWeight1, spikeWidth1, spikeAngle1, spikespikeGlip1, spikeResilience1];
    },
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  max-width: 800px;
}
h2 {
  border-bottom: 3px solid #327CBE;
  margin: 10vw 0 8vw;
}
/* スパイク画像トップ*/
.v-image__image--cover {
  background-size: contain !important;
}
.itemTitle {
  display: block;
  font-size: 20px;
  letter-spacing: 1px;
  border-bottom: solid 2px #327CBE;
  padding-bottom: 10px;
}
.v-image {
  height: 100% !important;
}
.spikeTopDesc {
  padding: 20px 0;
  font-weight: bold;
  line-height: 30px;
}

/* チャート */
.compareBtn {
  margin: 0 auto;
  display: block;
  padding: 10px 50px;
  border: solid 2px;
  font-weight: bold;
}

/* タブ */
.card-header {
  float: right;
  position: relative;
  left: 7%;
  width: 113%;
  margin-bottom: 10%;
  padding-top: 10px;
  background-color: #0494c8;
  z-index: 1;
}
.tabs .nav-link:before{
  content: "";
  display: block;
  width: 14vw;
  height: 11vw;
  background-size: contain !important;
}
.tabs .nav-link.active:before {
  filter: invert(46%) sepia(46%) saturate(5489%) hue-rotate(169deg) brightness(94%) contrast(104%) !important;
}
.tabs .nav-item:nth-child(1) .nav-link:before{
  background: url(~static/img/tab-icon1.png) no-repeat;
}
.tabs .nav-item:nth-child(2) .nav-link:before{
  background: url(~static/img/tab-icon2.png) no-repeat;
}
.nav-link {
  display: block;
  text-align: center;
  border: 1px solid transparent;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  margin: 0px 1vw;
  padding: 12px 16vw;
  color: #fff;
  font-weight: bold;
  transition: ease .2s;
}
.nav-link.active {
  color: #0494c8 !important;
  background-color: #fff !important;
}
/* 口コミ */

/* 基本情報　スパイク情報表 */
.basicInfo {
  border-collapse: collapse;
  width: 99.7709%;
  height: 243px;
}
.basicInfo tbody {
  display: block;
}
.basicInfo tr {
  display: flex;
}
.basicInfo td {
  padding: 1% !important;
  border-top: none;
  border-left: none;
}
.basicInfo td:nth-child(1) {
  text-align: center;
  color: #fff;
  background-color: #327CBE !important;
  width: 38%;
  font-weight: bold;
}
.basicInfo td:nth-child(2) {
  text-align: left;
  padding-left: 3% !important;
  width: 75%;
  font-weight: bold;
}

/* 一流選手に聞いてみた */
h3 {
  font-size: 4.5vw;
  font-weight: bold;
  border-left: solid 5px #327CBE;
  padding-left: 5px;
}
.blog-content img {
  width: 100%;
}
h4 {
  font-size: 3.8vw;
  color: #327CBE;
  font-weight: bold;
}
h5 {
  font-size: 3.8vw;
  font-weight: bold;
  margin-bottom: 7vw;
}
.otherTopP p {
  font-size: 4vw;
}
/* 商品紹介 */

/* こんな人におすすめ */

/* カルーセルの３点 */
.theme--dark.v-btn.v-btn--icon {
  color: #327cbe; /* vuetifyの上書き */
}

@media screen and (min-width: 768px) {
  .topSearchBar {
    top: 50vh;
    padding: 5vh;
  }
}

/* ==== PC ==== */
@media screen and (min-width: 768px) {
/* スパイク画像トップ*/

/* ボタン Amazon */

/* ボタン 楽天　*/

/* チャート */

/* 口コミ */

/* 基本情報　スパイク情報表 */

/* 一流選手に聞いてみた */
.blog-content h1 {
  font-size: 2.5vw;
}

/* 商品紹介 */

/* こんな人におすすめ */

/* カルーセルの３点 */
}
</style>
