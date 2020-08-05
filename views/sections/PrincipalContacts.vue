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
          <base-business-info title="Esteja em contacto connosco">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo pariatur quidem, quis modi iure nihil commodi suscipit, corporis dicta adipisci, voluptatum quia cupiditate.
          </base-business-info>
        </v-col>

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
    name: 'SectionKeepInTouch',
  }
</script>
