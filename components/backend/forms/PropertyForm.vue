<template>
  <div>
    <v-stepper v-model="step" non-linear vertical>
      <v-stepper-step
        :editable="!creating"
        :complete="step > 1"
        step="1"
        :rules="[() => propertyForm1Error()]"
      >
        Informações básicas
        <small>Registe as informações básicas desta propridades</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-form
          ref="form"
          @submit.prevent="nextStep('form-step-1')"
          data-vv-scope="form-step-1"
        >
          <v-row class="mt-2">
            <v-col cols="12" class="py-0">
              <v-text-field
                outlined
                name="name"
                label="Nome da propriedade"
                v-model="formData.name"
                v-validate="'required|alpha_spaces'"
                data-vv-name="form-step-1.name"
                :error-messages="
                  showFormErrors('name') || errors.collect('form-step-1.name')
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-textarea
                outlined
                rows="4"
                name="description"
                label="Descrição da propriedade"
                v-model="formData.description"
                auto-grow
                hint="Apresente uma pequena descrição desta propriedade"
                v-validate="'max:500'"
                counter
                data-vv-name="form-step-1.description"
                :error-messages="errors.collect('form-step-1.description')"
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row class="my-3">
            <v-col cols="12">
              <v-btn
                class="text-none"
                text
                type="submit"
                color="primary"
                rounded
                >Seguinte</v-btn
              >
              <v-btn class="text-none" to="/admin/properties" text rounded
                >Sair</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <v-stepper-step :editable="!creating" :complete="step > 2" step="2">
        Caracterização
        <small>Caracterizar esta propriedade</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-form
          ref="form"
          @submit.prevent="nextStep('form-step-2')"
          data-vv-scope="form-step-2"
        >
          <v-row class="mt-2">
            <v-col cols="12" md="6" class="py-0">
              <v-autocomplete
                outlined
                name="type"
                :items="types"
                item-text="name"
                item-value="id"
                v-model="formData.type"
                label="Tipo de propriedade"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-autocomplete
                outlined
                name="destinations"
                :items="destinations"
                item-text="name"
                item-value="id"
                prefix="Para:"
                multiple
                v-model="formData.destinations"
                label="Finalidades da propriedade"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                type="number"
                outlined
                name="price"
                label="Preço"
                prefix="$"
                :hint="
                  `Insira o preço em ECV que pode ser igual  ${Math.round(
                    formData.price * 0.0091
                  )} EURO`
                "
                v-model="formData.price"
                v-validate="'required|numeric'"
                data-vv-name="form-step-1.price"
                :error-messages="errors.collect('form-step-1.price')"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                type="number"
                outlined
                name="dimension"
                label="Demensão"
                suffix="Km2"
                v-model="formData.dimension"
                v-validate="'numeric'"
                data-vv-name="form-step-1.dimension"
                :error-messages="errors.collect('form-step-1.dimension')"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row row wrap class="my-3">
            <v-col cols="12">
              <v-btn class="text-none" text @click.native="prevStep()" rounded
                >Voltar</v-btn
              >
              <v-btn
                class="text-none"
                text
                type="submit"
                color="primary"
                rounded
                >Seguinte</v-btn
              >
              <v-btn class="text-none" to="/admin/properties" text rounded
                >Sair</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <v-stepper-step :editable="!creating" :complete="step > 3" step="3">
        Enderço e Localização Geográfica
        <small>Introduza as informações de localização da propriedade</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-form
          ref="form"
          @submit.prevent="nextStep('form-step-3')"
          data-vv-scope="form-step-3"
        >
          <v-row class="mt-2">
            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                name="state"
                label="Ilha/Estado"
                v-model="formData.location.state"
                v-validate="'required'"
                data-vv-name="form-step-3.state"
                :error-messages="errors.collect('form-step-3.state')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                name="city"
                label="Cidade"
                v-model="formData.location.city"
                v-validate="'required'"
                data-vv-name="form-step-3.city"
                :error-messages="errors.collect('form-step-3.city')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                outlined
                name="zone"
                label="Zona"
                v-model="formData.location.zone"
                v-validate="'required'"
                data-vv-name="form-step-3.zone"
                :error-messages="errors.collect('form-step-3.zone')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                type="number"
                outlined
                name="postcode"
                label="Código Postal"
                v-model="formData.location.postcode"
                v-validate="'required'"
                data-vv-name="form-step-3.postcode"
                :error-messages="errors.collect('form-step-3.postcode')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" class="py-0">
              <v-subheader>Geolocalização</v-subheader>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="py-0">
              <v-text-field
                type="number"
                dense
                outlined
                name="lat"
                label="Latitude"
                v-model="formData.location.geo.lat"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="py-0">
              <v-text-field
                type="number"
                dense
                outlined
                name="lng"
                label="Longitude"
                v-model="formData.location.geo.lng"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row row wrap class="my-3">
            <v-col cols="12">
              <v-btn class="text-none" text @click.native="prevStep()" rounded
                >Voltar</v-btn
              >
              <v-btn
                class="text-none"
                text
                type="submit"
                color="primary"
                rounded
                >Seguinte</v-btn
              >
              <v-btn class="text-none" to="/admin/properties" text rounded
                >Sair</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <v-stepper-step :editable="!creating" :complete="step > 4" step="4">
        Gallheria/Finalização
        <small>Comcluir o registo da propriedade</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-form
          ref="form"
          @submit.prevent="nextStep('form-step-4')"
          data-vv-scope="form-step-4"
        >
          <v-row>
            <v-col cols="12">
              <v-subheader>Imagem de Capa</v-subheader>
              <small>Carregue uma imagem da capa desta propriedade</small>
            </v-col>
            <v-col cols="12">
              <v-file-input show-size label="File input"></v-file-input>
            </v-col>
            <v-col cols="12">
              <v-subheader>Fotos da galheria</v-subheader>
            </v-col>
            <v-col cols="12"> Upload mult galary </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-subheader>Ativação e Destaque</v-subheader>
            </v-col>
            <v-col cols="12" class="ml-4">
              <v-switch
                dense
                label="Ativação da propreidade"
                v-model="formData.status"
              ></v-switch>
              <v-switch
                dense
                label="Distacar esta propriedade"
                v-model="formData.featured"
              ></v-switch>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row row wrap class="my-3">
            <v-col cols="12">
              <v-btn class="text-none" text @click.native="prevStep()" rounded
                >Voltar</v-btn
              >
              <v-btn
                class="text-none"
                text
                color="primary"
                rounded
                @click.stop="!creating ? updateProperty() : addProperty(false)"
              >
                {{ creating ? "Guardar" : "Guardar Alterações" }}
              </v-btn>
              <v-btn class="text-none" to="/admin/properties" text rounded
                >Sair</v-btn
              >
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { alerts } from "@/mixins/appAlerts";
export default {
  props: ["formData", "creating"],

  mixins: [alerts],

  data() {
    return {
      step: 1,
      types: [
        { id: "1", name: "Apartamento" },
        { id: "2", name: "Moradia" },
        { id: "3", name: "Bloco de Apartamentos" },
        { id: "4", name: "Lote de Terreno" },
        { id: "5", name: "Loja" },
        { id: "6", name: "Armazem" },
        { id: "7", name: "Quinta" },
        { id: "8", name: "Garagem" },
        { id: "9", name: "Quarto" },
        { id: "10", name: "Escritório" },
        { id: "11", name: "Outro" }
      ]
    };
  },

  computed: {
    ...mapGetters({
      destinations: "properties/destinations"
    })
  },

  methods: {
    selectcCover(event) {
      // `files` is always an array because the file input may be in multiple mode
      this.cover = event.target.files[0];
    },
    propertyForm1Error() {
      if (this.backend_form_errors && this.showFormErrors("name")) return false;
      return true;
    },
    nextStep(scope) {
      // this.$validator.validateAll(scope).then(result => {
      //   if (result) {
      this.step++;
      //   }
      // });
    },

    prevStep: function() {
      this.step--;
    },

    async addProperty(addNew) {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios.post("properties", this.$props.formData);

          if (!addNew) {
            this.$router.push("/admin/properties");
          }
          this.resetForm();

          process.client
            ? window.getApp.$emit("APP_UPDATE_PROPERTIES_DATA")
            : "";
        }
      } catch (error) {}
    },

    async updateProperty() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios
            .put(
              `properties/${this.$props.formData.slug}`,
              this.$props.formData
            )
            .then(res => {
              this.resetForm();
              this.feedback("success", res.data.msg);
              this.$router.push("/admin/properties");

              process.client
                ? window.getApp.$emit("APP_UPDATE_PROPERTIES_DATA")
                : "";
            });
        }
      } catch (error) {}
    }
  }
};
</script>