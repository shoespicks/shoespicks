<template>
  <div>
    <MyHeader />
    <Nuxt />
    <MyFooter />
  </div>
</template>

<script>
import myHeader from "~/components/Molecule/myHeader";
import myFooter from "~/components/Molecule/myFooter";

export default {
  components: {
    myHeader,
    myFooter,
  },
  // head: {
  //   bodyAttrs: {
  //     onload: "test"
  //   }
  // }
};
</script>
