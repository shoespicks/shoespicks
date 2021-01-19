<template>
  <div>
    <v-app-bar class="navBar" dense flat>
      <v-app-bar-nav-icon class="humbargerMenu"></v-app-bar-nav-icon>
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
    return {};
  },
};
</script>
