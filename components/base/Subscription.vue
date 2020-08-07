<template>
  <v-theme-provider :dark="dark">
    <v-container class="pa-0">
      <v-row :justify="justify" no-gutters>
        <v-col v-if="title || subtitle" :cols="callout ? 9 : 12">
          <base-title :title="title" class="text-uppercase" space="1" />

          <base-divider :color="color" />
          <slot></slot>

          <v-card class="ma-1 pa-3" color="grey darken-3 elevation-8">
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  dense
                  solo
                  outlined
                  name="name"
                  label="Email"
                  id="id"
                >
                  <template v-slot:append>
                    <v-btn color="primary" small fab><v-icon>mdi-send</v-icon></v-btn>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <small class="grey--text lighten-4">
                  Subscreva para receberes publicações em primeira mão
                </small>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col v-if="callout" cols="2">
          <div
            class="display-3 grey--text text--lighten-3 font-weight-bold pr-8"
            v-text="callout"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
// Mixins
import Heading from "@/mixins/heading";

export default {
  name: "BaseInfoCard",

  mixins: [Heading],

  props: {
    dark: Boolean,
    callout: String,
    color: {
      type: String,
      default: "primary"
    },
    icon: String,
    subtitle: String,
    text: String,
    title: String
  }
};
</script>
