<template>
  <v-card>
    <v-toolbar color="white" flat>
      <v-text-field
        flat
        solo
        prepend-icon="mdi-magnify"
        placeholder="Procurar serviços"
        v-model="search"
        hide-details
        class="hidden-sm-and-down"
      ></v-text-field>

      <template v-if="selected.length > 0">
        <v-btn
          icon
          @click="
            onDelete('delete-messages', '', 'APP_UPDATE_MESSAGES_DATA', true)
          "
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
      </template>

      <v-btn icon class="ma-1">
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :search="search"
        :items="messages"
        :items-per-page="10"
        single-expand
        :expanded.sync="expanded"
        class="elevation-1"
        item-key="id"
        show-expand
        show-select
        v-model="selected"
        no-data-text="Aguardando resposta do servidor..."
        no-results-text="Nada para mostrar"
        :footer-props="{
          itemsPerPageText: 'Registos por página'
        }"
      >
        <template v-slot:item.status="{ item }">
          <v-icon :color="item.status ? 'success' : 'error'"
            >mdi-circle-medium</v-icon
          >
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ $moment(item.created_at).format('ll') }}
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            :href="'mailto:' + item.from"
            color="grey darken-2"
            small
            text
            icon
            class="text-none"
          >
            <v-icon>mdi-reply</v-icon>
          </v-btn>
          <v-btn
            color="grey darken-2"
            small
            text
            icon
            class="text-none"
            :loading="deleting[item.id]"
            @click="
              onDelete('delete-messages', item.id, 'APP_UPDATE_MESSAGES_DATA')
            "
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length" class="pa-0 ma-0">
            <v-card flat color="grey lighten-2">
              <v-card-text>
                Assunto:
                <h4 class="text-uppercase font-weight-bold">
                  {{ item.subject }}
                </h4>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                {{ item.message }}
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  :href="'mailto:' + item.from"
                  small
                  color="accent"
                  text
                  class="text-none"
                  >Responder</v-btn
                >
              </v-card-actions>
            </v-card>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { deleteDatas } from "@/mixins/formActions";

export default {
  name: "GuestMessages",

  mixins: [deleteDatas],

  props: ["messages"],

  data() {
    return {
      expanded: [],
      deleting: {},
      search: "",
      selected: [],
      headers: [
        {
          text: "",
          value: "status",
          align: "center",
          sortable: false
        },
        {
          text: "Nome",
          value: "name"
        },

        {
          text: "Email (De)",
          value: "from"
        },

        {
          text: "Enviado em",
          value: "created_at"
        },
        {
          text: "Operação",
          align: "center",
          sortable: false,
          value: "action"
        },
        { text: "", value: "data-table-expand" }
      ]
    };
  }
};
</script>
