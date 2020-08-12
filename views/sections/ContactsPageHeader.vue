<template>
  <v-theme-provider dark>
    <base-section space="0" id="contacts-page-header" class="grey lighten-2">
      <v-responsive class="mx-auto">
        <base-img
          :height="$vuetify.breakpoint.mdAndUp ? 350 : 225"
          :src="`about.jpg`"
          gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
          color="#45516b"
          flat
          max-width="100%"
          tile
        >
          <v-row
            v-if="title"
            align="center"
            class="ma-0 fill-height text-center"
            justify="center"
          >
            <v-col cols="12">
              <base-heading :title="title" space="2" weight="500" />

              <base-divider color="primary" dense />
            </v-col>
          </v-row>
        </base-img>
      </v-responsive>
    </base-section>
  </v-theme-provider>
</template>

<script>
// Components

export default {
  name: "SectionContactsPageHeader",

  data() {
    return {
      title: "Contactos/Contactar"
    };
  },
  provide: {
    heading: { align: "center" }
  }
};
</script>
