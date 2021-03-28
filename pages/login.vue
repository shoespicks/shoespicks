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
            <b-form-input
              type="text"
              v-model="infoBody"
              placeholder="ユーザー情報を入力"
            ></b-form-input>
            {{ infoBody }}
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
  infoBody: string;
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
      infoBody: "",
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
          infoBody: this.infoBody,
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
