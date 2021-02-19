<template>
  <div class="bgFooter">
    <div class="socialicon">
      <p>SNSをフォローして最新情報をチェック！！</p>
      <a href="https://www.youtube.com/?gl=JP">
        <img src="@/assets//img/socialicon/IG_Glyph_Fill.png" alt="Instgram" />
      </a>
      <a href="https://www.facebook.com/ShoesPicks-106804874781788">
        <img src="@/assets//img/socialicon/f_logo_RGB-Blue_58.png" alt="Facebook" />
      </a>
      <a href="https://www.youtube.com/channel/UCuEGLSAoPqO7kfIAuwieRuQ/featured">
        <img src="@/assets//img/socialicon/youtube_social_squircle_red.png" alt="Youtube" />
      </a>
      <a href="https://twitter.com/PicksShoes">
        <img src="@/assets//img/socialicon/Twitter_Social_Icon_Circle_Color.png" alt="Twitter" />
      </a>
    </div>
    <ul>
      <li><nuxt-link to="/login">無料会員登録｜ログイン</nuxt-link></li>
      <li>
        <nuxt-link to="/spikeSearch">スパイクを探す</nuxt-link>
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
      <li>利用規約</li>
      <li><nuxt-link to="/privacy">プライバシーポリシー</nuxt-link></li>
      <li>©︎{{ new Date().getFullYear() }} Einja, Inc. All Rights Received</li>
    </ul>
    <ShoesPicksLogo />
  </div>
</template>
<script>
import shoesPicksLogo from "../Atom/shoesPicksLogo";
export default {};
</script>

<style>
.bgFooter {
  width: 100vw;
  padding: 5vw 7vw;
  font-size: 3.2vw;
  color: #fff;
  background-color: #0a1921 !important;
}

.bgFooter a,
.bgFooter li {
  list-style-type: none;
  text-decoration: none;
  color: #fff;
  line-height: 200%;
}
.bgFooter ul > li:first-of-type {
  font-weight: 600;
}
.socialicon {
  text-align: center;
  font-weight: 600;
}
.socialicon img {
  width: 48px;
  margin: 2vw 2vw 6vw 2vw;
}
</style>
