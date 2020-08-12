<template>
  <base-section
    id="info-alt"
    space="2"
  >
    <v-container>
      <v-row justify="space-between">
        <v-col
          cols="12"
          md="5"
        >
          <base-business-info>
          </base-business-info>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col
          cols="12"
          md="6"
        >
          <base-contact-form title="Envie a sua mensagem" />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'PrincipalContacts',
  }
</script>
