<template>
  <v-row>
    <v-col>
      <v-text-field
        dense
        outlined
        prepend-inner-icon="mdi-magnify"
        name="name"
        label="Procurar propriedades"
        v-model="search"
      ></v-text-field>
      <!--<v-menu
        tile
        allow-overflow
        nudge-bottom="40"
        bottom
        max-width="600"
        max-height="350"
        :close-on-content-click="closeOnContentClick"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            dense
            outlined
            prepend-inner-icon="mdi-magnify"
            name="name"
            label="Procurar propriedades"
            v-on="on"
            v-bind="attrs"
          ></v-text-field>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>-->
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["search"],
  data() {
    return {
      showMenu: false,
      closeOnContentClick: true,

      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" },
        { title: "Click Me 2" }
      ]
    };
  },
  methods: {
    show() {
      this.showMenu = true;
    }
  }
};
</script>
