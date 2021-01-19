<template>
  <div>
    <v-app-bar class="menuBack" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer class="menuBack" v-model="drawer" absolute bottom temporary>
      <ShoesPicksLogo />
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <nuxt-link to="/">
            <v-list-item>
              <v-list-item-title>無料会員登録｜ログイン</v-list-item-title>
            </v-list-item>
          </nuxt-link>

          <div class="sepLine"></div>

          <nuxt-link to="/spikeSearch">
            <v-list-item>
              <v-list-item-title>スパイクを探す</v-list-item-title>
            </v-list-item>
          </nuxt-link>
          <nuxt-link to="/spikeCompare">
            <v-list-item>
              <v-list-item-title>スパイクを比較する</v-list-item-title>
            </v-list-item>
          </nuxt-link>
          <a href="https://note.com/smartdash">
            <v-list-item>
              <v-list-item-title>SMART DASH</v-list-item-title>
            </v-list-item>
          </a>
          <a href="https://moyashitaro.github.io/einja/">
            <v-list-item>
              <v-list-item-title>運営会社</v-list-item-title>
            </v-list-item>
          </a>
          <nuxt-link to="/">
            <v-list-item>
              <v-list-item-title>利用規約</v-list-item-title>
            </v-list-item>
          </nuxt-link>
          <nuxt-link to="/privacy">
            <v-list-item>
              <v-list-item-title>プライバシーポリシー</v-list-item-title>
            </v-list-item>
          </nuxt-link>
        </v-list-item-group>
        <p>©︎2021 Einja, Inc. All Rights Received</p>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import shoesPicksLogo from "../Atom/shoesPicksLogo";
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
