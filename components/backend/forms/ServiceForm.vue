<template>
  <v-card>
    <v-card-title>
      <span class="primary--text font-weight-regular">{{
        creating ? "Registo de serviço" : "Atualizar serviço"
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
              label="Nome do serviço*"
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
              v-validate="'required|max:1000'"
              data-vv-name="description"
              :error-messages="
                showFormErrors('description') || errors.collect('description')
              "
            ></v-textarea>
          </v-col>

          <v-col cols="12" md="6" class="mb-0 py-0">
            <v-autocomplete
              v-model="formData.icon"
              :items="icons"
              clearable
              item-text="name"
              item-value="key"
              name="icon"
              label="Ícone"
              v-validate="'required'"
              data-vv-name="icon"
              :error-messages="showFormErrors('icon') || errors.collect('icon')"
            ></v-autocomplete>
            <v-avatar v-if="formData.icon" color="grey lighten-2">
              <v-icon large color="primary">{{ formData.icon }}</v-icon>
            </v-avatar>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="text-none"
        text
        depressed
        small
        :ripple="false"
        color="accent"
        @click.stop="
          creating ? toggleCreateServiceDialog() : toggleUpdateServiceDialog()
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
          @click.stop="addService(false)"
          >Registar e Sair</v-btn
        >

        <v-btn
          class="text-none"
          text
          depressed
          small
          :ripple="false"
          color="primary"
          @click.stop="addService(true)"
          >Registar e Novo</v-btn
        >
      </template>

      <v-btn
        v-if="!creating"
        class="text-none"
        rounded
        depressed
        small
        :ripple="false"
        color="primary"
        @click.stop="updateService()"
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
  name: "ServiceForm",
  props: ["formData", "creating"],
  mixins: [dateFormat, alerts],

  data() {
    return {
      sending: false,
      icons: [
        { key: "mdi-home", name: "Home" },
        { key: "mdi-heart", name: "Coração" },
        { key: "mdi-school", name: "Formação" },
        { key: "mdi-home-city-outline", name: "Metrópole" },
        { key: "mdi-flower", name: "Crescimento" },
        { key: "mdi-hammer-wrench", name: "Ferramentas" },
        { key: "mdi-hand-heart", name: "Amor" },
        { key: "mdi-handshake", name: "Negócio" },
        { key: "mdi-domain", name: "Instituição" },
        { key: "mdi-charity", name: "Caridade" },
        { key: "mdi-engine", name: "Engenharia" },
        { key: "mdi-compass", name: "Explorar" },
        { key: "mdi-pencil-ruler", name: "Design" },
        { key: "mdi-brain", name: "Cerebro" },
        { key: "mdi-math-compass", name: "Projetar" },
        { key: "mdi-head-cog-outline", name: "Pisicologia" },
        { key: "mdi-desktop-classic", name: "Computação" },
        { key: "mdi-home-heart", name: "Família" },
        { key: "mdi-alphabetical", name: "Afabetização" },
        { key: "mdi-currency-usd", name: "Dinheiro" },
        { key: "mdi-certificate-outline", name: "Diploma" },
        { key: "mdi-diamond", name: "Furtuna" },
        { key: "mdi-key", name: "Chave" },
        { key: "mdi-star-outline", name: "Estrela" },
        { key: "mdi-earth", name: "Globalização" }
      ]
    };
  },

  methods: {
    async addService(addNew) {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          this.sending = true;
          await this.$axios.post("services", this.$props.formData).then(res => {
            this.sending = false;
            this.feedback("success", res.data.msg);
            this.resetForm();
            this.$validator.reset();
            process.client
              ? window.getApp.$emit("APP_UPDATE_SERVICES_DATA")
              : "";
          });

          if (!addNew) {
            this.toggleCreateServiceDialog();
          }
        }
      } catch (error) {
        this.sending = false;
      }
    },

    async updateService() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios
            .put(`services/${this.$props.formData.id}`, this.$props.formData)
            .then(res => {
              this.toggleUpdateServiceDialog();
              this.feedback("success", res.data.msg);
              this.resetForm();
              this.$validator.reset();
              process.client
                ? window.getApp.$emit("APP_UPDATE_SERVICES_DATA")
                : "";
            });
        }
      } catch (error) {}
    },

    toggleCreateServiceDialog() {
      this.$store.commit("services/toggleCreateServiceDialog");
    },
    toggleUpdateServiceDialog() {
      this.$store.commit("services/toggleUpdateServiceDialog");
    }
  }
};
</script>
