<template>
  <div>
    <v-form>
      <div class="menuFormCon">
        <b-form-select v-model="query[0]" :options="options"></b-form-select>
        <span class="batsu"></span>
        <b-form-select v-model="query[1]" :options="options2"></b-form-select>
      </div>
      <!-- <b-form-select v-model="query[2]" :options="options3"> </b-form-select> -->
      <b-btn @click.prevent="submit" class="searchBtn">検索</b-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: [null, null, null],
      options: [
        { value: null, text: "種目", disabled: true },
        {
          label: "トラック",
          options: [
            { value: "shortsprint", text: "短距離" },
            { value: "midlesprint", text: "中距離" },
            { value: "longsprint", text: "長距離" },
          ],
        },
        {
          label: "フィールド",
          options: [
            { value: "longjump", text: "走幅跳・三段跳" },
            { value: "highjump", text: "走高跳・棒高跳" },
            { value: "throw", text: "投擲" },
          ],
        },
      ],
      options2: [
        { value: null, text: "メーカー", disabled: true },
        { value: "ミズノ", text: "ミズノ" },
        { value: "アシックス", text: "アシックス" },
        { value: "ナイキ", text: "ナイキ" },
        { value: "アディダス", text: "アディダス" },
        { value: "ニューバランス", text: "ニューバランス" },
      ],
      options3: [
        { value: null, text: "表示順", disabled: true },
        {
          // label: "価格",
          options: [
            { value: "fields.spikePrice", item: "L", text: "価格｜安い順" },
            { value: "-fields.spikePrice", item: "H", text: "価格｜高い順" },
          ],
        },
        {
          // label: "重さ",
          options: [
            { value: "fields.spikeWeightNumber",  text: "重さ｜軽い順" },
            { value: "-fields.spikeWeightNumber", text: "重さ｜重い順" },
          ],
        },
        {
          // label: "反発性",
          options: [
            { value: "fields.spikeResilience", text: "反発｜弱い順" },
            { value: "-fields.spikeResilience", item: "H", text: "反発｜強い順" },
          ],
        },
        {
          label: "ソールの傾斜",
          options: [
            { value: "-fields.spikeAngle", item: "L", text: "ソール傾斜｜シャープ順" },
            { value: "fields.spikeAngle", item: "H", text: "ソール傾斜｜フラット順" },
          ],
        },
        {
          // label: "足幅",
          options: [
            { value: "fields.spikeWidth", text: "足幅｜狭い順" },
            { value: "-fields.spikeWidth", text: "足幅｜広い順" },
          ],
        },
        {
          // label: "グリップ性",
          options: [
            { value: "fields.spikeGlip", text: "グリップ性｜低い順" },
            { value: "-fields.spikeGlip", text: "グリップ性｜高い順" },
          ],
        },
      ],
    };
  },
  computed: {
    // 検索キーワードが有効な場合にtrueを返す
    validQuery() {
      return (
        !!this.query && // 入力必須
        !/^\s+$/.test(this.query) && // 空白のみ禁止
        this.$route.query.q !== this.query
      ); // 値の変化
    },
  },
  methods: {
    submit() {
      var categoryStr = String(this.query[0]);
      this.$router.push({
          path: "/spikeList/" + categoryStr, 
          query: { brandName: this.query[1]}
      });

      // someメソッドは配列内の値に引っかかるがあれば true
      // query配列のなかにnullじゃない値があれば true
      
      // if (this.query.some((num) => num !== null)) {
      //   // let query = this.query.join(" ");
      //   // this.$router.push({ path: "/spikeList/", query: { q: query } });

      // } else if (this.query[0] == null) {
      //   // let query = this.query.join("");
      //   // this.$router.push({ path: "/spikeList/", query: { q: query } });
      // }
      // // query = "";
    },
  },
};
</script>

<style>
.menuFormCon {
  display: flex;
}
.batsu {
  display: block;
  width: 10vw;
  height: 3vw;
  position: relative;
  margin: auto 2vw;
}
.batsu::before,
.batsu::after {
  content: "";
  display: block;
  width: 100%; /*バツ線の長さ*/
  height: 4px; /*バツ線の太さ*/
  background: #9a9a9a;
  transform: rotate(45deg);
  transform-origin: 0% 50%;
  position: absolute;
  top: calc(14% - 5px);
  left: 14%;
}
.batsu::after {
  transform: rotate(-45deg);
  transform-origin: 100% 50%;
  left: auto;
  right: 14%;
}
.searchBtn {
  display: block;
  color: white !important;
  background-color: #007fff;
  margin: 3vw auto;
  border-color: #007fff;
  padding: 1vh 10vw;
}
/* タブレット版 */
@media screen and (min-width: 768px) {
  .batsu {
    width: 3vw;
    height: 2vw;
    margin: auto 2vw;
  }
}

/* PC版 */
@media screen and (min-width: 1025px) {
  .batsu {
    width: 2vw;
    height: 1vw;
  }
}
</style>
