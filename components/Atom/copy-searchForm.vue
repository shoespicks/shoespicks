<template>
  <div>
    <v-form>
      <!-- <v-text-field
        ref="searchForm"
        v-model="query"
        hide-details
        placeholder="キーワードを入力してね"
        dense
      /> -->
       <b-form-select
          v-model="query[0]"
          placeholder="種目"
          :options="options"
        >
    　</b-form-select>
       <b-form-select
          v-model="query[1]"
          :options="options2"
        >
    　</b-form-select>
      <b-btn @click.prevent="submit">検索</b-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: [],
      // query2: null,
      options: [
        // { value: '種目', text: '種目', disabled: true},
        { value:'種目', text: '種目', disabled: true, selected: true, style:'display:none;' },
          {
            label: '短距離',
            options: [
              { value: '100m', text: '100m' },
              { value: '200m', text: '200m' },
              { value: '400m', text: '400m' },
              { value: '110mH', text: '110mH' }
            ]
          },
          {
            label: '中距離',
            options: [
              { value: '800m', text: '800m' },
              { value: '1500m', text: '1500m' },
            ]
          },
          {
            label: '長距離',
            options: [
              { value: '3000m', text: '3000m' },
              { value: '5000m', text: '5000m' },
              { value: '10000m', text: '10000m' },
            ]
          },
      ],
      options2: [
            { value: 'メーカー', text: 'メーカー', disabled: true},
            { value: 'ミズノ', text: 'ミズノ' },
            { value: 'アシックス', text: 'アシックス' },
            { value: 'ナイキ', text: 'ナイキ' },
            { value: 'アディダス', text: 'アディダス' },
            { value: 'ニューバランス', text: 'ニューバランス' },
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
      let query = this.query.join('  ');
      this.$router.push({ path: "/spikeSearch", query: { q: query } });
      query = "";
    },
  },
};
</script>
