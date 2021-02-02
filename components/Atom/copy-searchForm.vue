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
      query: [null, null, null],
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
        { value: null, text: 'こだわり', disabled: true },
            { 
              label: 'price',
              options: [
                { value: 'L', item: 'L', text: '安い順' },
                { value: 'H', item: 'H', text: '高い順' },
              ]
            },
            // price,weight,width,resilience,angle,grip,
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
      let query = this.query.join('  ');
      this.$router.push({ path: "/spikeSearch", query: { q: query } });
      query = "";
    },
  },
};
</script>
