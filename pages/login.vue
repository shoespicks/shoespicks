<template>
  <div class="">
    <div>
      <div v-if="!loginUser">
        <b-btn style="background-color: #55acee" @click="loginWithTwitter"> twitterログイン </b-btn>
        <b-btn style="background-color: #3b5998" @click="loginWithFacebook">
          Facebookログイン
        </b-btn>
        <b-btn style="background-color: #fff" @click="loginWithGoogle"> Googleログイン </b-btn>
        <p>ログインして口コミを確認しよう</p>
      </div>

      <div v-if="loginUser">
        <!--  ユーザー情報をfirebaceに登録 -->
        <b-form @submit="submitUserInfo">
          <b-form-group>
            <label>生年月日</label>
            <b-form-input
              type="date"
              v-model="birthday"
              placeholder="2020/11/30"
              required
            ></b-form-input>

            <label>性別</label>
            <b-form-input type="text" v-model="sex" placeholder="男" required></b-form-input>

            <label>地域（都道府県）</label>
            <b-form-input
              type="text"
              v-model="liveArea"
              placeholder="東京都"
              required
            ></b-form-input>

            <label>陸上歴（年）</label>
            <b-form-input
              type="number"
              v-model="TFHistory"
              placeholder="10"
              required
            ></b-form-input>

            <label>種目（混成の方は最も得意な種目）</label>
            <b-form-input
              type="text"
              v-model="specialty"
              placeholder="100m"
              required
            ></b-form-input>

            <label>自己ベスト記録</label>
            <b-form-input
              type="number"
              v-model="bestRecord"
              placeholder="(例)×10秒98→◯1098 ×2分8秒12→◯20812 ×8m15cm→◯815"
              required
            ></b-form-input>

            <label>現在使用しているスパイクメーカー</label>
            <b-form-input
              type="text"
              v-model="nowSpikeMaker"
              placeholder="mizuno"
              required
            ></b-form-input>

            <label>現在使用しているスパイク名</label>
            <b-form-input
              type="text"
              v-model="nowSpikeName"
              placeholder="クロノインクス9"
              required
            ></b-form-input>

            <label>所属（学校やチーム名）</label>
            <b-form-input
              type="text"
              v-model="belongs"
              placeholder="立教新座高校陸上部"
            ></b-form-input>
          </b-form-group>
          <b-btn type="submit">登録する</b-btn>
        </b-form>

        <b-btn @click="logout">ログアウト</b-btn>
      </div>
    </div>
    <!--  一個前に戻るボタン -->
    <button @click="goBack">Go Back</button>

    <!--  ユーザー情報をfirebaceから取得 -->
    <button @click="getUserInfo">Get UserInfo</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { authStore } from "~/store/index";
import { addUserInfoStore } from "~/store/index";
import { AddUserInfoModel } from "~/store/types/addUserInfoEntity";
import { $authRepository, $userRepository } from "~/plugins/repository";

interface Data {
  birthday: string;
  sex: string;
  liveArea: string;
  TFHistory: number;
  specialty: string;
  bestRecord: string;
  nowSpikeMaker: string;
  nowSpikeName: string;
  belongs: string;
}

export default Vue.extend({
  computed: {
    loginUser() {
      return authStore.user;
    },
    addUserInfos(): AddUserInfoModel[] | undefined {
      return addUserInfoStore.userAddUserInfos(this.$data.userId);
    },
  },
  data(): Data {
    return {
      birthday: "",
      sex: "",
      liveArea: "",
      TFHistory: 0,
      specialty: "",
      bestRecord: "",
      nowSpikeMaker: "",
      nowSpikeName: "",
      belongs: "",
    };
  },
  methods: {
    // 一個前に戻るボタン
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    getUserInfo() {
      const userLastData = $userRepository.getById(authStore.user?.id);
      console.log(userLastData);
    },

    submitUserInfo(e: Event): void {
      e.preventDefault();
      addUserInfoStore
        .postUserAddUserInfo({
          userId: authStore.user?.id,
          birthday: this.birthday,
          sex: this.sex,
          liveArea: this.liveArea,
          TFHistory: this.TFHistory,
          specialty: this.specialty,
          bestRecord: this.bestRecord,
          nowSpikeMaker: this.nowSpikeMaker,
          nowSpikeName: this.nowSpikeName,
          belongs: this.belongs,
        })
        .then((response: any) => {
          console.log(response);
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
  },
});
</script>
