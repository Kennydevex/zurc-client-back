<template>
  <v-container grid-list-xs>
    <v-row no-gutters>
      <v-col cols="12">
        <vueper-slides
          class="mb-3 no-shadow"
          ref="vueperslides1"
          :arrows="false"
          fade
          @slide="
            $refs.vueperslides2 &&
              $refs.vueperslides2.goToSlide($event.currentSlide.index, {
                emit: false
              })
          "
          :slide-ratio="1 / 2"
          :bullets="false"
        >
          <vueper-slide
            v-for="(gallery, i) in property.galleries"
            :key="i"
            :image="`${publicURL}/uploads/gallery/${gallery.name}`"
          />
        </vueper-slides>
        <vueper-slides
          class="no-shadow"
          ref="vueperslides2"
          :gap="1"
          :bullets="false"
          :slide-ratio="1 / 8"
          :dragging-distance="50"
          @slide="
            $refs.vueperslides1 &&
              $refs.vueperslides1.goToSlide($event.currentSlide.index, {
                emit: false
              })
          "
          :visible-slides="4"
          fixed-height="120px"
        >
          <vueper-slide
            v-for="(gallery, i) in property.galleries"
            :key="i"
            @click.native="
              $refs.vueperslides2 && $refs.vueperslides2.goToSlide(i)
            "
            :image="`${publicURL}/uploads/gallery/${gallery.name}`"
          >
          </vueper-slide>
        </vueper-slides>
      </v-col>

      <v-col cols="12">
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" md="9">
            <v-row>
              <v-col cols="12">
                <base-title class="text-uppercase primary--text">{{
                  property.name
                }}</base-title>
                <base-divider color="primary"></base-divider>
                <v-chip dark class="font-weight-bold mb-3">
                  <v-avatar left>
                    <v-icon>mdi-map-marker</v-icon>
                  </v-avatar>
                  {{ property.location.state }} | {{ property.location.city }} |
                  {{ property.location.zone }}</v-chip
                >
                <p class="font-weight-regular text-justify">
                  {{ property.description }}
                </p></v-col
              >
            </v-row>
          </v-col>
          <v-col cols="12" md="3">
            <v-row>
              <v-col cols="12">
                <v-card tile>
                  <v-card-title class="primary white--text font-weight-regular">
                    Especificações
                  </v-card-title>

                  <v-card-text class="grey lighten-3">
                    <div class="pt-4">
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr>
                              <td>Desde</td>
                              <td>
                                {{ $moment(property.created_at).format("L") }}
                              </td>
                            </tr>

                            <tr>
                              <td>Estado</td>
                              <td>
                                <v-chip
                                  small
                                  :color="property.status ? 'info' : 'grey'"
                                  >{{
                                    property.status
                                      ? "Disponível"
                                      : "Indiponível"
                                  }}</v-chip
                                >
                              </td>
                            </tr>
                            <tr>
                              <td>Tipo de Propriedade</td>
                              <td>{{ propertyType }}</td>
                            </tr>

                            <tr
                              v-if="
                                property.type != '1' &&
                                  property.type != '2' &&
                                  property.type != '3'
                              "
                            >
                              <td>Area</td>
                              <td>{{ property.dimension }}m²</td>
                            </tr>

                            <template
                              v-if="
                                property.type === '1' || property.type === '2'
                              "
                            >
                              <tr>
                                <td>Tipologia</td>
                                <td>{{ property.typology }}</td>
                              </tr>
                              <tr>
                                <td>Espço de Lazer</td>
                                <td>{{ property.leisure }}</td>
                              </tr>
                            </template>
                            <tr>
                              <td>Finalidade</td>
                              <td>
                                <v-chip
                                  outlined
                                  small
                                  v-for="(destination,
                                  i) in property.destinations"
                                  :key="i"
                                  >{{ destination.name }}</v-chip
                                >
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>

                    <v-card-title class="px-0">
                      <v-btn-toggle
                        v-model="currency_type"
                        color="primary"
                        dense
                        group
                      >
                        <v-btn small :value="1" text>
                          ECV
                        </v-btn>

                        <v-btn small :value="2" text>
                          EUR
                        </v-btn>
                      </v-btn-toggle>
                      <v-chip label color="primary" class="font-weight-bold">{{
                        propertyPrice
                      }}</v-chip>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-btn
                        text
                        x-small
                        class="text-none text-decoration-underline"
                        color="accent"
                        >Quero uma propriedade</v-btn
                      >
                      <v-spacer></v-spacer>
                      <v-badge color="primary" content="6">
                        <v-btn small icon color="accent"
                          ><v-icon>mdi-thumb-up-outline</v-icon></v-btn
                        >
                      </v-badge>
                    </v-card-actions>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12">
                <v-card tile>
                  <v-card-title class="primary white--text font-weight-regular">
                    Localização
                  </v-card-title>

                  <v-card-text class="grey lighten-3 pa-0">
                    <gmap-map
                      :center="mapPisotion"
                      map-type-id="terrain"
                      :zoom="7.5"
                    >
                      <gmap-marker :position="mapPisotion" />
                    </gmap-map>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <span>Partilhe com os seu amigos</span>
          </v-col>
          <v-col cols="12">
            <ShareNetwork
              v-for="network in networks"
              :network="network.network"
              :key="network.network"
              :url="siteURL + $route.path"
              :title="property.name"
              :description="property.description"
              :quote="'Zurconstroi'"
              :hashtags="propertyType"
              :twitterUser="'Zurconstroi'"
            >
              <v-btn
                dark
                tile
                class="text-none ma-1"
                small
                :color="network.color"
                ><v-icon>{{ network.icon }}</v-icon> {{ network.name }}</v-btn
              >
            </ShareNetwork>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import { mapGetters } from "vuex";
export default {
  name: "PropertyInfo",
  layout: "frontend",

  head() {
    return {
      title: this.property.name,
      // `${publicURL}/uploads/${property.cover}`
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.property.description
        },
        { hid: "og:title", name: "og:title", content: this.property.name },
        {
          hid: "og:description",
          name: "og:description",
          content: this.property.description
        },
        // { hid: 'og:url', name: 'og:url', content: this.pageUrl },
        {
          hid: "og:image",
          name: "og:image",
          content: `${process.env.PUBLIC_URL}/uploads/${this.property.cover}`
        },
        { hid: "og:type", name: "og:type", content: "article" },
        {
          hide: "twitter:card",
          name: "twitter:card",
          content: this.property.cover ? "summary_large_image" : "summary"
        }
        // { hide: 'twitter:site', name: 'twitter:site', content: this.$store.state.site.twitter }
      ].filter(x => x.content)
    };
  },

  async fetch({ store, params }) {
    await store.dispatch("properties/getActivedProperty", params.slug);
  },

  data() {
    return {
      currency_type: 1,
      // sharing: {
      //   url: process.env.SITE_URL + this.$route.path,
      //   title: this.proName,
      //   description: this.proDescription,
      //   quote: "Zurconstroi",
      //   hashtags: this.propertyType,
      //   twitterUser: "Zurconstroi"
      // },

      networks: [
        {
          network: "email",
          name: "Email",
          icon: "mdi-email",
          color: "#333333"
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "mdi-facebook",
          color: "#1877f2"
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "mdi-linkedin",
          color: "#007bb5"
        },

        {
          network: "skype",
          name: "Skype",
          icon: "mdi-skype",
          color: "#00aff0"
        },

        {
          network: "twitter",
          name: "Twitter",
          icon: "mdi-twitter",
          color: "#1da1f2"
        },

        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "mdi-whatsapp",
          color: "#25d366"
        }
      ]
    };
  },

  components: { VueperSlides, VueperSlide },

  computed: {
    ...mapGetters({ property: "properties/actived_property" }),

    mapPisotion() {
      return this.property ? this.property.location.geo : "";
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

    propertyPrice() {
      if (this.property) {
        return this.currency_type === 1
          ? this.property.price + "$00"
          : Math.round(this.property.price * 0.00907, 1) + "\u20ac";
      }
      return;
    }
  }
};
</script>

<style lang="stylus" scoped>
.vue-map-container
  height: 150px
  width: 100%
</style>
