<template>
  <div class="">
    <div>
      <b-btn style="background-color: #55acee" @click="loginWithTwitter"> twitterログイン </b-btn>
      <b-btn style="background-color: #3b5998" @click="loginWithFacebook"> Facebookログイン </b-btn>
      <b-btn style="background-color: #fff" @click="loginWithGoogle"> Googleログイン </b-btn>
      <p>ログインして口コミを確認しよう</p>

      <b-btn @click="logout">ログアウト</b-btn>
    </div>
  </div>
</template>

<script>
import { authStore } from "~/store/index";
export default {
  computed: {},
  data() {
    return {};
  },
  methods: {
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
};
</script>
