<template>
  <v-card>
    <v-card-title>
      <span class="primary--text font-weight-regular">{{creating?'Registo de diretriz':'Atualizar diretriz'}}</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="formData.designation"
              dense
              name="designation"
              label="Designação do diretriz*"
              v-validate="'required|alpha_spaces'"
              data-vv-name="designation"
              :error-messages="showFormErrors('designation') || errors.collect('designation')"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-textarea
              filled
              auto-grow
              label="Descrição"
              name="presentation"
              v-model.trim="formData.presentation"
              v-validate="'required|max:1000'"
              data-vv-name="presentation"
              :error-messages="
                showFormErrors('presentation') || errors.collect('presentation')
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
        rounded
        depressed
        small
        :ripple="false"
        color="accent"
        @click.stop="
          creating ? toggleCreateGuidelineDialog() : toggleUpdateGuidelineDialog()
        "
        >Cancelar</v-btn
      >

      <template v-if="creating">
        <v-btn
          class="text-none"
          rounded
          depressed
          small
          :ripple="false"
          color="primary"
          @click.stop="addGuideline(false)"
          >Registar e Sair</v-btn
        >

        <v-btn
          class="text-none"
          rounded
          depressed
          small
          :ripple="false"
          color="primary"
          @click.stop="addGuideline(true)"
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
        @click.stop="updateGuideline()"
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
  name: "GuidelineForm",
  props: ["formData", "creating"],
  mixins: [dateFormat, alerts],

  data() {
    return {
      sending: false,
       icons: [
        { key: "mdi-eye", name: "Valores" },
        { key: "mdi-hand-heart", name: "Visão" },
        { key: "mdi-bullseye-arrow", name: "Missão" },
        { key: "mdi-heart", name: "Coração" },
        { key: "mdi-flower", name: "Crescimento" },
        { key: "mdi-hand-heart", name: "Amor" },
        { key: "mdi-handshake", name: "Negócio" },
        { key: "mdi-home-heart", name: "Família" },
        { key: "mdi-currency-usd", name: "Dinheiro" },
        { key: "mdi-diamond", name: "Furtuna" },
        { key: "mdi-key-chain", name: "Chave" },
        { key: "mdi-key-chain", name: "Chave" },
      ]
    };
  },

  methods: {
    async addGuideline(addNew) {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          this.sending = true;
          await this.$axios.post("guidelines", this.$props.formData).then(res => {
            this.sending = false;
            this.feedback("success", res.data.msg);
            this.resetForm();
            process.client
              ? window.getApp.$emit("APP_UPDATE_GUIDELINES_DATA")
              : "";
          });

          if (!addNew) {
            this.toggleCreateGuidelineDialog();
          }
        }
      } catch (error) {
        this.sending = false;
      }
    },

    async updateGuideline() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios
            .put(`guidelines/${this.$props.formData.id}`, this.$props.formData)
            .then(res => {
              this.toggleUpdateGuidelineDialog();
              this.feedback("success", res.data.msg);
              this.resetForm();
              process.client
                ? window.getApp.$emit("APP_UPDATE_GUIDELINES_DATA")
                : "";
            });
        }
      } catch (error) {}
    },

    toggleCreateGuidelineDialog() {
      this.$store.commit("guidelines/toggleCreateGuidelineDialog");
    },
    toggleUpdateGuidelineDialog() {
      this.$store.commit("guidelines/toggleUpdateGuidelineDialog");
    }
  }
};
</script>
