<template>
  <v-container grid-list-xs fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title class="primary--text font-weight-regular">
            Registo de utilizador
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-xs fluid pa-0>
              <v-row>
                <v-col cols="12" md="6" class="py-0">
                  <v-text-field
                    dense
                    name="name"
                    label="Nome completo"
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "CreateUser",
  layout: "backend",
  middleware: ["auth"]
};
</script>
