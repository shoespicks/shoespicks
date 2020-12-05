# COMPONENTS

**This directory is not required, you can delete it if you don't want to use it.**

The components directory contains your Vue.js Components.

_Nuxt.js doesn't supercharge these components._
！！！　CSS命名規則　！！！

Rule2　枠組みの名前付け方
    Sec ＞ Wrap ＞ Con＞ Box

Rule3 　役割を示す名前
    例：index.vue のトップページの場合
      種目で選ぶ:      .menuEvent
      ランキングで選ぶ: .menuRanking

    例：serch.vue のスパイク図鑑ページの場合
　　   フィルター  :  .filter
      メーカーロゴ :　.makerLogo
      スパイクリスト: .spikeImg, .spikePrice, .spikeTitle

    例: _id.vue の詳細ページ
      レビュー:     .review
      比較チャート:  .chart
      基本情報:     .detail
      一流選手:     .voice
      商品紹介:     .product
      おすすめ:     .recommend

Rule4  How to Name Parts Class
要素・文字囲い　spacL spaceM spaceS
文字サイズ     textL textM textS textSub
文字　太さ     fw-bold
文字　色       fc-white fc-black fc-indigo  fc-skyblue　fc-orange
背景　色       bc-white bc-indigo bc-Dindigo bc-indigo bc-skyblue
背景画像       bg-ファイル名　　(拡張子なし)　bg-web bg-design
ボタン         btn bg-white bg-orange
フォーム      form
複数ページにまたがるcontainerを作りたい時  flex-container
