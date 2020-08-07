<template>
  <v-card
    tile
    v-bind="$attrs"
    v-on="$listeners"
    :ripple="false"
    :height="height"
    :width="width"
    nuxt
  >
    <!--@click="$emit('click')"-->
    <v-img
      class="white--text"
      height="130px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-container grid-list-xs>
        <v-row no-gutters>
          <v-col align-self="end" class="white--text">
            <template v-for="(destination, index) in property.destinations">
              <v-chip
                :key="index"
                class="white--text font-weight-bold text-uppercase text-decoration-underline ma-1"
                small
                color="compl_prim"
                >{{ destination.name }}</v-chip
              >
            </template>
            <v-chip
              class="white--text font-weight-bold text-uppercase"
              small
              color="accent"
              >{{ propertyType }}</v-chip
            >
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <v-card-text class="primary py-0">
      <v-row>
        <v-col>
          <template v-if="property.dimension">
            <small class="mx-1 white--text"
              ><v-icon small dark>mdi-ruler</v-icon
              >{{ property.dimension }}m²</small
            >
            |
          </template>
          <small class="mx-1 white--text"
            ><v-icon small dark>mdi-bed</v-icon> T4</small
          >
          |
          <small class="mx-1 white--text"
            ><v-icon small dark>mdi-coffee</v-icon> 4</small
          >
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-subtitle class="pb-0"
      ><v-icon>mdi-clock-start</v-icon>
      {{
        $moment(property.created_at).fromNow()
          | capitalize({ onlyFirstLetter: true })
      }}</v-card-subtitle
    >
    <v-divider></v-divider>

    <v-card-text class="py-3">
      <div class="primary--text font-weight-bold text-uppercase">
        <nuxt-link
          :to="{
            name: 'properties-ver-slug',
            params: { slug: property.slug }
          }"
          >{{ property.name }}</nuxt-link
        >
      </div>
      <div class="grey--text text--darken-2 font-weight-regular">
        {{ property.description | truncate(trunc) }}
      </div>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions class="text--primary">
      <v-btn-toggle v-model="currency_type" color="primary" dense group>
        <v-btn small :value="1" text>
          ECV
        </v-btn>

        <v-btn small :value="2" text>
          &#8364;
        </v-btn>
      </v-btn-toggle>
      <v-chip label color="grey lighten-1" small>{{ propertyPrice }}</v-chip>
      <v-spacer></v-spacer>
      <v-badge bordered left color="primary">
        <span slot="badge">20</span>
        <v-btn color="primary" small icon>
          <v-icon>mdi-hand-pointing-up</v-icon>
        </v-btn>
      </v-badge>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PropertiesCard",
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
    propertyPrice() {
      if (this.property) {
        return this.currency_type === 1
          ? this.property.price + "$00"
          : Math.round(this.property.price * 0.00907, 1) + "\u20ac";
      }
      return;
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
    }
  },
  data() {
    return {
      currency_type: 1
    };
  }
};
</script>
