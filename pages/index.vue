<template>
  <v-row no-gutters>
    <v-col cols="12">
      <HomeCaroucel />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "HomePage",
  layout: "frontend",

  components: {
    HomeCaroucel: () => import("@/views/sections/HomeCaroucel"),
    HomeServices: () => import("@/views/sections/HomeServices"),
    HomeGuidelines: () => import("@/views/sections/HomeGuidelines"),
    HomeFeaturedProperties: () =>
      import("@/views/sections/HomeFeaturedProperties"),
    PrincipalContacts: () => import("@/views/sections/PrincipalContacts"),
    HomeFooter: () => import("@/views/sections/HomeFooter")
  }
};
</script>

<style lang="scss" scoped></style>
