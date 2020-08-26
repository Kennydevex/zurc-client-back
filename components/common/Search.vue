<template>
  <div>
    <v-menu
      tile
      allow-overflow
      nudge-bottom="50"
      bottom
      max-width="600"
      max-height="350"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          clearable
          @input="search()"
          v-model="searchTerm"
          :loading="searching"
          hide-details
          dense
          outlined
          prepend-inner-icon="mdi-magnify"
          name="name"
          label="Procurar em todos os regsitos"
          v-on="on"
          v-bind="attrs"
        >
          <!--<template v-slot:append>
            <v-progress-circular
              v-if="searching"
              indeterminate
              color="primary"
              size="18"
              width="1"
            ></v-progress-circular>
          </template>-->
        </v-text-field>
      </template>

      <template v-if="searchTerm">
        <v-list three-line v-if="searchResult.length === 0">
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                :src="
                  searching
                    ? '/components/searching.svg'
                    : '/components/no_result.svg'
                "
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{
                  searching ? "Procurando..." : "Procura sem resultado"
                }}</v-list-item-title
              >
              <v-list-item-subtitle v-if="searching"
                >A procurar pela '{{ searchTerm }}',
                aguarde...</v-list-item-subtitle
              >
              <v-list-item-subtitle v-else
                >A procura pela '{{ searchTerm }}' não teve nenhum
                retorno</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list three-line v-else>
          <template v-for="(property, index) in searchResult">
            <v-divider v-if="index > 0" :key="index" inset></v-divider>
            <v-list-item
              nuxt
              :to="{
                name: 'properties-ver-slug',
                params: { slug: property.slug }
              }"
              :key="property.id"
            >
              <v-list-item-avatar>
                <v-img
                  :src="`${publicURL}/uploads/${property.cover}`"
                  lazy-src="/loading/lazy-img.webp"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title> {{ property.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  property.description | truncate(100)
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </template>
    </v-menu>
  </div>
</template>

<script>
import { debounce, isNull } from "lodash";

export default {
  data() {
    return {
      showMenu: false,
      closeOnContentClick: true,

      searchTerm: "",
      searchResult: [],
      searching: false
    };
  },

  watch: {
    searchTerm(newVal, oldVal) {
      if (newVal == "" || isNull(newVal)) {
        this.$data.searchResult = [];
      }
    }
  },

  //   computed: {
  //     imageSrc() {
  //       return this.publicURL + "/uploads/" + this.property.cover;
  //     }
  //   },
  methods: {
    show() {
      this.showMenu = true;
    },

    search: debounce(function(e) {
      if (this.$data.searchTerm.length < 3) {
        return;
      }
      this.$data.searching = true;
      this.$axios
        .post("search-properties", { searchTerm: this.$data.searchTerm })
        .then(res => {
          this.searchResult = res.data.data;
          this.$data.searching = false;
        })
        .catch(error => {
          console.log(error);
          this.$data.searching = false;
        });
    }, 500)
  }
};
</script>
