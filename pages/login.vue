<template>
  <div class="page">
    <form class="form" @submit.prevent>
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
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    // login() {
    //   firebase
    //     .auth()
    //     .signInWithEmailAndPassword(this.email, this.password)
    //     .then((user) => {
    //       // eslintがある場合は
    //       // 引数にuser追加とeslint-disable-lineの記載
    //       console.log("成功！"); // eslint-disable-line
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     });
    // },
    login(email, password) {
      this.$store.dispatch("login", { email: this.email, password: this.password });
    },
  },
};
</script>
