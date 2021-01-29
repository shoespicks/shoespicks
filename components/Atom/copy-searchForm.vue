<template>
  <div>
    <v-form @submit.prevent="submit">
      <!-- <v-text-field
        ref="searchForm"
        v-model="query"
        hide-details
        placeholder="キーワードを入力してね"
        dense
      /> -->
       <b-form-select
          v-model="query"
          :options="options"
        >
    　</b-form-select>
      <b-btn @click="submit">検索</b-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: null,
      options: [
        { value: null, text: '種目', disabled: true},
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
      this.$router.push({ path: "/spikeSearch", query: { q: this.query } });
      this.query = "";
      this.$refs.searchForm.blur();
    },
  },
};
</script>
