<template>
  <div>
    <div>
      <v-app-bar class="menuBack" dark>
        <v-app-bar-nav-icon style="color: #fff" v-b-toggle.sidebar-backdrop></v-app-bar-nav-icon>
      </v-app-bar>

      <b-sidebar id="sidebar-backdrop" :backdrop-variant="variant" backdrop shadow>
        <ShoesPicksLogo />
        <ul class="hamburger">
          <li><nuxt-link to="/login">無料会員登録｜ログイン</nuxt-link></li>

          <div class="sepLine"></div>

          <li>
            <p v-b-toggle.collapse-1>▼スパイクを探す</p>
            <b-collapse id="collapse-1">
              <p v-b-toggle.collapse-1-inner>▼トラック</p>
              <b-collapse id="collapse-1-inner" class="mt-2">
                <li><nuxt-link to="/spikeSearch">短距離</nuxt-link></li>
                <li><nuxt-link to="/spikeSearch">中距離</nuxt-link></li>
                <li><nuxt-link to="/spikeSearch">長距離</nuxt-link></li>
              </b-collapse>
              <p v-b-toggle.collapse-2-inner>▼フィールド</p>
              <b-collapse id="collapse-2-inner" class="mt-2">
                <li><nuxt-link to="/spikeSearch">走幅跳・三段跳</nuxt-link></li>
                <li><nuxt-link to="/spikeSearch">走高跳・棒高跳</nuxt-link></li>
                <li><nuxt-link to="/spikeSearch">投擲</nuxt-link></li>
              </b-collapse>
            </b-collapse>
          </li>
          <li>
            <nuxt-link to="/spikeCompare">スパイクを比較する</nuxt-link>
          </li>
          <li>
            <a href="https://note.com/smartdash">SMART DASH</a>
          </li>
          <li>
            <a href="https://moyashitaro.github.io/einja/">運営会社</a>
          </li>
          <li>
            <nuxt-link to="/">利用規約</nuxt-link>
          </li>
          <li><nuxt-link to="/privacy">プライバシーポリシー</nuxt-link></li>
        </ul>
      </b-sidebar>
    </div>
    <!-- <search-form /> -->
  </div>
</template>

<script>
import shoesPicksLogo from "../Atom/shoesPicksLogo";

export default {
  components: {
    shoesPicksLogo,
  },
  data() {
    return {
      variant: "dark",
    };
  },
};
</script>

<style>
.menuBack {
  background-color: #0a1921 !important;
}
.b-sidebar {
  /* bootstrapの上書き */
  background-color: #0a1921 !important;
}
.sepLine {
  /* SNSと堺の線 */
  width: 100%;
  height: 0.1vw;
  background-color: #707070;
  margin: 1.5vw 0;
}
.hamburger li,
.hamburger a {
  margin-left: 5%;
  list-style-type: none;
  text-decoration: none;
  color: #fff;
}
.hamburger p {
  margin-bottom: 0;
}
</style>
