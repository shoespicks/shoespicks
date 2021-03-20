<template>
<div class="purchaseBtnCon">
  <b-button @click="amazonLink" class="purchaseBtn" variant="warning">
    Amazonで見る
  </b-button>
  <b-button @click="rakutenLink" class="purchaseBtn" variant="danger">
    楽天市場で見る
  </b-button>
</div>
</template>
<script>

export default {
  data() {
    return {};
  },
  props: ["url"],
  methods: {
    amazonLink() {
      window.open(this.url.fields.amazonURL, "_blank");
    },
    rakutenLink() {
      window.open(this.url.fields.rakutenUrl, "_blank");
    },
  },
};
</script>

<style>
.purchaseBtnCon {
  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
}
.purchaseBtn {
  color: #fff;
  font-weight: 600;
  font-size: 4vw;
  padding: 10px 20px 10px;
  border-radius: 20px;
}
.purchaseBtn:hover {
  color: #fff;
  /* background: #fff !important; */
  /* border-color: #ffd900; */
}
</style>
