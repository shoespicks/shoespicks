<template>
  <div>
    <v-app-bar dense>
      <nuxt-link to="/" class="site-name">
        {{ siteName }}
      </nuxt-link>
      <v-spacer />
      <search-form />
    </v-app-bar>
  </div>
</template>

<script>
import searchForm from "../ui/searchForm";
export default {
  components: {
    searchForm,
  },
  data() {
    return {
      siteName: "SiteNameAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    };
  },
};
</script>

<style>
a.site-name {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
  font-size: 1.25rem;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
