<template>
  <div class="login">
    <p v-if="user.login" class="text">
      {{ user }}
      <button class="button" type="submit" @click="logout">Logout</button>
    </p>
    <form v-else class="form" @submit.prevent>
      <label class="label">
        <span class="label"> email </span>
        <input class="input" type="text" v-model="email" />
      </label>
      <label class="label">
        <span class="label"> password </span>
        <input class="input" type="password" v-model="password" />
      </label>
      <button class="button" type="submit" @click="login">Login</button>
    </form>
    <button class="button" type="submit" @click="loginWithTwitter">Twitterでloginする</button>
    <button class="button" type="submit" @click="loginWithGoogle">googleでloginする</button>
  </div>
</template>

<script>
import Vue from "vue";
import { contentfulClient } from "~/plugins/contentful";
import { authStore } from "~/store";
import { commentStore } from "~/store";
import { CommentModel } from "~/store/types/commentEntity";

export default {
  computed: {
    user() {
      return this.$store.getters["user"];
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(email, password) {
      if (this.$store.dispatch("login", { email: this.email, password: this.password }))
        // 成功したら1以上がreturnで帰ってくる
        this.$router.push("/");
    },
    logout() {
      // --------actionsで実装できない--------
      // this.$store.dispatch("logout");
      this.$store.commit("isLogout");
      this.$router.push("/");
    },
    loginWithTwitter() {
      this.$store.dispatch("loginWithTwitter");
    },
    loginWithGoogle() {
      this.$store.dispatch("loginWithGoogle");
    },
  },
};
</script>
