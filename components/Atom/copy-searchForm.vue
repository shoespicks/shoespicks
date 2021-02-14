<template>
  <div>
    <v-form>
      <div class="menuFormCon">
       <b-form-select
            v-model="query[0]"
            :options="options"
          >
      　</b-form-select>
        <b-form-select
            v-model="query[1]"
            :options="options2"
          >
      　</b-form-select>
      </div>
      <span class="batsu"></span>
        <b-form-select
            v-model="query[2]"
            :options="options3"
          >
        </b-form-select>
      <b-btn @click.prevent="submit" class="searchBtn">検索</b-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: [null,null,null],
      options: [
        { value: null, text: '種目', disabled: true },
          {
            label: 'トラック',
            options: [
              { value: '短距離', text: '短距離' },
              { value: '中距離', text: '中距離' },
              { value: '長距離', text: '長距離' },
            ]
          },
          {
            label: 'フィールド',
            options: [
              { value: '走幅跳・三段跳', text: '走幅跳・三段跳' },
              { value: '走高跳・棒高跳', text: '走高跳・棒高跳' },
              { value: '投擲', text: '投擲' },
            ]
          }
      ],
      options2: [
            { value: null, text: 'メーカー', disabled: true },
            { value: 'ミズノ', text: 'ミズノ' },
            { value: 'アシックス', text: 'アシックス' },
            { value: 'ナイキ', text: 'ナイキ' },
            { value: 'アディダス', text: 'アディダス' },
            { value: 'ニューバランス', text: 'ニューバランス' },
      ],
      options3: [
        { value: null, text: '表示順', disabled: true },
            { label: '価格',
              options: [
                { value: '安い順', item: 'L', text: '安い順' },
                { value: '高い順', item: 'H', text: '高い順' },
            ]},
            { label: '重さ',
              options: [
                { value: '軽い順', item: 'L', text: '軽い順' },
                { value: '重い順', item: 'H', text: '重い順' },
            ]},
            { label: '反発性',
              options: [
                { value: '弱い順', item: 'L', text: '弱い順' },
                { value: '強い順', item: 'H', text: '強い順' },
            ]},
            { label: 'ソールの傾斜',
              options: [
                { value: '鈍角順', item: 'L', text: '鈍角順' },
                { value: '鋭角順', item: 'H', text: '鋭角順' },
            ]},
            { label: '足幅',
              options: [
                { value: '狭い順', item: 'L', text: '狭い順' },
                { value: '広い順', item: 'H', text: '広い順' },
            ]},
            { label: 'グリップ性',
              options: [
                { value: 'グリップ性低い順', item: 'L', text: '低い順' },
                { value: 'グリップ性高い順', item: 'H', text: '高い順' },
            ]},
      ]
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
      // someメソッドは配列内の値に引っかかるがあれば true
      // query配列のなかにnullじゃない値があれば true
      if (this.query.some( num => num !== null)) {
        let query = this.query.join(' ');
        this.$router.push({ path: "/spikeSearch/", query: { q: query } });
      }
      else if (this.query[0] == null) {
        let query = this.query.join('');
        this.$router.push({ path: "/spikeSearch/", query: { q: query } });
      }
      query = "";
    },
  },
};
</script>
