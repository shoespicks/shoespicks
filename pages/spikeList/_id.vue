<template>
  <div class="container">
    <div>
      <h1 class="itemTitle">
        {{ spike.fields.spikeMaker[0] }}<br />{{ spike.fields.spikeTitle }} 評価レビュー
      </h1>
      <v-carousel :show-arrows="false" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item
          v-for="(spikeImg, id) in spike.fields.spikePhoto"
          :key="id"
          :src="spike.fields.spikePhoto[id].fields.file.url"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <p>参考価格：{{ spike.fields.spikePrice }}（税込）</p>
      <purchaseBtn :url="spike.fields.amazonURL"></purchaseBtn>
      <p>{{ spike.fields.spikeDescription }}</p>

      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="詳細" active>
              <b-card-text>

                <barChart :parameter1="parameter1"></barChart>

                <!-- <NuxtLink to="/spikeCompare">
                <b-button pill variant="primary" @click="$nuxt.$router.compare">他の靴と比較する</b-button>
                </NuxtLink> -->
                <router-link :to="{ name: 'spikeCompare', query: { spikeName1: spike.fields.id } }">
                  <b-button pill variant="primary" @click="$nuxt.$router.compare"
                    >他の靴と比較する</b-button
                  >
                </router-link>

                <h2>基本情報</h2>

                <table class="basicInfo">
                  <tbody>
                    <tr>
                      <td>定価価格</td>
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

                <purchaseBtn :url="spike.fields.amazonURL"></purchaseBtn>

                <h2>一流選手に聞いてみた！</h2>
                <p v-if="!loginUser">ログインして一流選手のレビューを確認しよう</p>
                <div
                  v-if="loginUser"
                  class="blog-content"
                  v-html="$md.render(spike.fields.spikePlayerQuestion)"
                ></div>
                <b-img
                  :src="spike.fields.spikePlayerListPhoto[0].fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>

                <h2>商品紹介</h2>
                <h3>アッパーについて</h3>
                <b-img
                  :src="spike.fields.spikeUpperPhotoNear.fields.file.url"
                  fluid-grow
                  alt="Fluid-grow image"
                ></b-img>
                <p>{{ spike.fields.spikeUpperDiscription1 }}</p>

                <b-img
                  :src="spike.fields.spikeUpperPhotoFar.fields.file.url"
                  fluid-grow
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

                <h2>こんな人にオススメ</h2>
                <p>{{ spike.fields.spikeRecomend }}</p>
                <purchaseBtn :url="spike.fields.amazonURL"></purchaseBtn>
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
import spikeCompareVue from "../spikeCompare.vue";
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
    // 2回出てしまう＋コメントしてから見て欲しい
    // this.fetchComments();
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

    makeParameter1(){
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
.itemTitle {
  display: block;
  font-weight: 300;
  font-size: 20px;
  color: #35495e;
  letter-spacing: 1px;
}

/* スパイク情報表 */
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
  border: 1px solid #ddd;
  border-top: none;
  border-left: none;
}
.basicInfo td:nth-child(1) {
  text-align: center;
  color: #fff;
  background-color: #0494c8 !important;
  width: 25%;
}
.basicInfo td:nth-child(2) {
  text-align: left;
  padding-left: 3% !important;
  width: 75%;
}

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
</style>
