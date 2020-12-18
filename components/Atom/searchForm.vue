<template>
  <div>
    <v-form @submit.prevent="submit">
      <v-text-field
        ref="searchForm"
        v-model="query"
        hide-details
        placeholder="キーワードを入力"
        dense
      />
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
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
      this.$router.push({ path: "/search", query: { q: this.query } });
      this.query = "";
      this.$refs.searchForm.blur();
    },
  },
};
</script>
