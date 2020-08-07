<template>
  <v-theme-provider dark>
    <base-section id="info-alt" class="grey darken-4">
      <v-responsive class="mx-auto" max-width="1400">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="4">
              <base-info-card title="Contactos" />

              <base-business-contact dense />
            </v-col>

            <v-col cols="12" md="4">
              <services-info />
            </v-col>

           
            <v-col cols="12" md="4">
              <!--<base-info title="Contactos" />-->
              <base-subscription title="Subscrição" />
            </v-col>
          </v-row>
        </v-container>
      </v-responsive>
    </base-section>
  </v-theme-provider>
</template>

<script>
export default {
  name: "SectionBusinessInfo",

  components: {
    SocialMedia: () => import("@/components/frontend/SocialMedia"),
    ServicesInfo: () => import("@/components/frontend/ServicesInfo")
  }
};
</script>

<style lang="sass">
#info-alt a
  text-decoration: none
</style>
