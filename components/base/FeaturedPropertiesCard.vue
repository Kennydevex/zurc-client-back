<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      class="mx-2"
      v-bind="$attrs"
      v-on="$listeners"
      :ripple="false"
      :height="height"
      :width="width"
      nuxt
    >
      <v-img
        :aspect-ratio="16 / 9"
        src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out compl_prim darken-2 v-card--reveal white--text"
            style="height: 100%;"
          >
            <div class="display-2">
              $14.99
            </div>
          </div>
        </v-expand-transition>
      </v-img>

      <v-card-text class="pt-6" style="position: relative;">
        <v-btn absolute color="primary" class="white--text" fab large right top>
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text title mb-2">
          <v-chip small color="compl_prim" dark label>text</v-chip>
          <v-chip small color="accent" label>text</v-chip>
        </div>
        <h3 class="title font-weight-light primary--text mb-2">
          {{ property.name | truncate(25) }}
        </h3>
        <div class="font-weight-light body mb-2">
          {{ property.description | truncate(trunc) }}
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "FeaturedPropertiesCard",
  props: {
    property: {
      type: Object,
      default: function() {
        return {};
      }
    },

    trunc: {
      type: Number,
      default: 100
    },

    height: [Number, String],
    width: [Number, String]
  },

  computed: {
    imageSrc() {
      return this.publicURL + "/uploads/" + this.property.cover;
    },
    propertyType() {
      if (this.property) {
        let m_type = [
          "Apartamento",
          "Moradia",
          "Bloco de Apartamentos",
          "Lote de Terreno",
          "Loja",
          "Armazem",
          "Quinta",
          "Garagem",
          "Quarto",
          "Escritório",
          "Terreno",
          "Outro"
        ];
        return m_type[Number(this.property.type) - 1];
      }
      return;
    },
    propertyDestination() {
      if (this.property) {
        let destination = ["À Venda", "Arrendamento", "Para Comprar"];
        return destination[Number(this.property.destination) - 1];
      }
      return;
    }
  }
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
