<template>
  <div>
    <v-app-bar dense>
      <nuxt-link to="/" class="backTopLink">
        {{ siteName }}
      </nuxt-link>
      <v-spacer />
      <!-- <search-form /> -->
    </v-app-bar>
  </div>
</template>

<script>
import searchForm from "../Atom/searchForm";
export default {
  components: {
    searchForm,
  },
  data() {
    return {
      siteName: "ShoesPicks",
    };
  },
};
</script>
