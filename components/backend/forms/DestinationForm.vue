<template>
  <v-card>
    <v-card-title>
      <span class="primary--text font-weight-regular">{{
        creating ? "Registo de finalidade" : "Atualizar finalidade"
      }}</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="formData.name"
              dense
              name="name"
              label="Nome da finalidade*"
              v-validate="'required|alpha_spaces'"
              data-vv-name="name"
              :error-messages="showFormErrors('name') || errors.collect('name')"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              filled
              auto-grow
              label="Descrição"
              name="description"
              v-model.trim="formData.description"
              v-validate="'max:500'"
              data-vv-name="description"
              :error-messages="
                showFormErrors('description') || errors.collect('description')
              "
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="text-none"
        rounded
        depressed
        small
        :ripple="false"
        color="accent"
        @click.stop="
          creating
            ? toggleCreateDestinationDialog()
            : toggleUpdateDestinationDialog()
        "
        >Cancelar</v-btn
      >

      <template v-if="creating">
        <v-btn
          class="text-none"
          text
          depressed
          small
          :ripple="false"
          color="primary"
          @click.stop="addDestination(false)"
          >Registar e Sair</v-btn
        >

        <v-btn
          class="text-none"
          text
          depressed
          small
          :ripple="false"
          color="primary"
          @click.stop="addDestination(true)"
          >Registar e Novo</v-btn
        >
      </template>

      <v-btn
        v-if="!creating"
        class="text-none"
        text
        depressed
        small
        :ripple="false"
        color="primary"
        @click.stop="updateDestination()"
        >Guardar Arterações</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat } from "@/mixins/dateTime";
import { alerts } from "@/mixins/appAlerts";

export default {
  name: "DestinationForm",
  props: ["formData", "creating"],
  mixins: [dateFormat, alerts],

  data() {
    return {
      sending: false
    };
  },

  methods: {
    async addDestination(addNew) {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          this.sending = true;
          await this.$axios
            .post("destinations", this.$props.formData)
            .then(res => {
              this.sending = false;
              this.feedback("success", res.data.msg);
              this.resetForm();
              this.$validator.reset();

              process.client
                ? window.getApp.$emit("APP_UPDATE_DESTINATIONS_DATA")
                : "";
            });

          if (!addNew) {
            this.toggleCreateDestinationDialog();
          }
        }
      } catch (error) {
        this.sending = false;
      }
    },

    async updateDestination() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios
            .put(
              `destinations/${this.$props.formData.id}`,
              this.$props.formData
            )
            .then(res => {
              this.toggleUpdateDestinationDialog();
              this.feedback("success", res.data.msg);
              this.resetForm();
              this.$validator.reset();

              process.client
                ? window.getApp.$emit("APP_UPDATE_DESTINATIONS_DATA")
                : "";
            });
        }
      } catch (error) {}
    },

    toggleCreateDestinationDialog() {
      this.$store.commit("destinations/toggleCreateDestinationDialog");
    },
    toggleUpdateDestinationDialog() {
      this.$store.commit("destinations/toggleUpdateDestinationDialog");
    }
  }
};
</script>
