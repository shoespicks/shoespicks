<template>
  <div>
    <MyHeader />
    <Nuxt />
    <MyFooter />
  </div>
</template>

<script>
// cssの読み込み
import "@/assets/css/style.css";

import myHeader from "~/components/Molecule/myHeader";
import myFooter from "~/components/Molecule/myFooter";

export default {
  components: {
    myHeader,
    myFooter,
  },
};
</script>
