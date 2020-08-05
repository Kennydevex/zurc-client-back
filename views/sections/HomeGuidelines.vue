<template>
  <base-section
    id="features"
    class="grey lighten-2"
  >
    <v-responsive
      class="mx-auto"
      max-width="1350"
    >
      <v-container fluid>
        <v-row justify="center">
          <v-col
            v-for="card in cards"
            :key="card.title"
            cols="12"
            sm="4"
            md="3"
          >
            <base-info-card
              align="center"
              
              v-bind="card"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionFeatures',

    data: () => ({
      cards: [
        {
          icon: 'mdi-keyboard-outline',
          title: 'Missão',
          text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
        },
        {
          icon: 'mdi-camera-outline',
          title: 'Visão',
          text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
        },
        {
          icon: 'mdi-pencil-outline',
          title: 'Valores',
          text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.',
        },
      
      ],
    }),
  }
</script>
