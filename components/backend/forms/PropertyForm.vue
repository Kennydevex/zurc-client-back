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
                dense
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
                dense
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
                name="typology"
                :items="[
                  'T0',
                  'T1',
                  'T2',
                  'T3',
                  'T4',
                  'T5',
                  'T6',
                  'V1',
                  'V2',
                  'V3',
                  'V4',
                  'V5',
                  'V6'
                ]"
                v-model="formData.typology"
                label="Tipologia"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6" class="py-0">
              <v-autocomplete
                dense
                name="destinations"
                :items="destinations"
                item-text="name"
                item-value="id"
                v-model="formData.destinations"
                label="Finalidades da propriedade"
              ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                type="number"
                dense
                name="leisure"
                label="Espaço de lazer"
                v-model.number="formData.leisure"
                v-validate="'numeric'"
                data-vv-name="form-step-1.leisure"
                :error-messages="errors.collect('form-step-1.leisure')"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                type="number"
                name="price"
                label="Preço"
                suffix="ECV"
                :hint="
                  `Insira o preço em ECV que pode ser igual  ${Math.round(
                    formData.price * 0.0091
                  )} EURO`
                "
                v-model.number="formData.price"
                v-validate="'required|numeric'"
                data-vv-name="form-step-1.price"
                :error-messages="errors.collect('form-step-1.price')"
              >
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                type="number"
                name="dimension"
                label="Demensão"
                suffix="m²"
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
                name="state"
                label="Ilha/Estado"
                v-model.trim="formData.location.state"
                v-validate="'required'"
                data-vv-name="form-step-3.state"
                :error-messages="errors.collect('form-step-3.state')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                name="city"
                label="Cidade"
                v-model.trim="formData.location.city"
                v-validate="'required'"
                data-vv-name="form-step-3.city"
                :error-messages="errors.collect('form-step-3.city')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                name="zone"
                label="Zona"
                v-model.trim="formData.location.zone"
                v-validate="'required'"
                data-vv-name="form-step-3.zone"
                :error-messages="errors.collect('form-step-3.zone')"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6" class="py-0">
              <v-text-field
                type="number"
                name="postcode"
                label="Código Postal"
                v-model.trim="formData.location.postcode"
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
                name="lat"
                label="Latitude"
                v-model.number="formData.location.geo.lat"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3" class="py-0">
              <v-text-field
                type="number"
                dense
                name="lng"
                label="Longitude"
                v-model.number="formData.location.geo.lng"
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
            <!-- ======================================================== -->
            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-subheader>Imagem de Capa</v-subheader>
                  <small class="primary--text"
                    >Carregue uma imagem da capa desta propriedade
                  </small>
                </v-col>

                <v-col cols="12">
                  <Upload
                    :disabled="uploadCoverList && uploadCoverList.length == 1"
                    ref="uploadCover"
                    :show-upload-list="false"
                    :on-success="handleCoverSuccess"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :format="['jpg', 'jpeg', 'png']"
                    :on-exceeded-size="handleMaxSize"
                    :on-error="handleError"
                    type="drag"
                    :action="`${$axios.defaults.baseURL}/upload-property-cover`"
                    :headers="{
                      'Access-Control-Allow-Origin': '*',
                      'X-Requested-With': 'XMLHttpRequest'
                    }"
                  >
                    <div style="padding: 20px 0">
                      <v-icon
                        :color="
                          uploadCoverList && uploadCoverList.length == 1
                            ? 'grey'
                            : 'primary'
                        "
                        x-large
                        >{{
                          uploadCoverList && uploadCoverList.length == 1
                            ? "mdi-cloud-check"
                            : "mdi-cloud-upload"
                        }}</v-icon
                      >
                      <p>Clique ou largue a sua imagem aqui</p>
                    </div>
                  </Upload>
                  <div
                    class="demo-upload-list"
                    v-for="(item, i) in uploadCoverList"
                    :key="i"
                  >
                    <template v-if="item.status === 'finished'">
                      <img
                        v-if="formData.cover"
                        :src="`${publicURL}/uploads/${formData.cover}`"
                      />
                      <div class="demo-upload-list-cover">
                        <v-icon dark @click.native="handleRemoveCover(item)"
                          >mdi-delete</v-icon
                        >
                      </div>
                    </template>
                    <template v-else>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- ======================================================== -->

            <!-- ======================================================== -->

            <v-col cols="6">
              <v-row>
                <v-col cols="12">
                  <v-subheader>Imagens da Galeria</v-subheader>
                  <small class="primary--text"
                    >Carregue todas as outras imagens desta propriedade</small
                  >
                </v-col>

                <v-col cols="12">
                  <Upload
                    ref="uploadGallery"
                    :show-upload-list="false"
                    :on-success="handleGallerySuccess"
                    :format="['jpg', 'jpeg', 'png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :on-error="handleError"
                    type="drag"
                    :action="
                      `${$axios.defaults.baseURL}/upload-property-gallery`
                    "
                    :headers="{
                      'X-Requested-With': 'XMLHttpRequest',
                      'Access-Control-Allow-Origin': '*'
                    }"
                  >
                    <div style="padding: 20px 0">
                      <v-icon color="primary" x-large>mdi-cloud-upload</v-icon>
                      <p>Clique ou largue a sua imagem aqui</p>
                    </div>
                  </Upload>

                  <div
                    class="demo-upload-list"
                    v-for="(item, i) in uploadGalleryList"
                    :key="i"
                  >
                    <template v-if="item.status === 'finished'">
                      <img
                        v-if="formData.galleries[i]"
                        :src="
                          `${publicURL}/uploads/gallery/${formData.galleries[i].name}`
                        "
                      />
                      <div class="demo-upload-list-cover">
                        <v-icon
                          dark
                          @click.native="handleRemoveGallery(item, i)"
                          >mdi-delete</v-icon
                        >
                      </div>
                    </template>
                    <template v-else>
                      <Progress
                        v-if="item.showProgress"
                        :percent="item.percentage"
                        hide-info
                      ></Progress>
                    </template>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <!-- ======================================================== -->
          </v-row>

          <v-divider></v-divider>
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
// import { mapGetters } from "vuex";
import { alerts } from "@/mixins/appAlerts";
import { Upload } from "view-design";
import { uploadFeedback } from "@/mixins/handleFileUploads";

export default {
  props: ["formData", "creating"],

  mixins: [alerts, uploadFeedback],

  data() {
    return {
      step: 1,
      teste: [],
      uploadCoverList: [],
      uploadGalleryList: [],
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
        { id: "11", name: "Terreno" },
        { id: "12", name: "Outro" }
      ],
       destinations: [
        { id: "1", name: "À Venda" },
        { id: "2", name: "Arrendamento" },
        { id: "3", name: "Para Comprar" },
      ]
    };
  },

  mounted() {
    this.creating
      ? (this.uploadCoverList = this.$refs.uploadCover.fileList)
      : this.uploadCoverList.push({
          response: this.formData.cover,
          status: "finished"
        });

    this.setGalleryList();
  },

  computed: {
    // ...mapGetters({
    //   destinations: "destinations/destinations"
    // })
  },

  components: {
    Upload
  },

  methods: {
    setGalleryList() {
      if (this.creating) {
        this.formData.galleries = [];
      }
      let mthis = this;
      if (!this.creating && this.formData.galleries.length > 0) {
        this.formData.galleries.forEach(function(gallery) {
          mthis.uploadGalleryList.push({
            response: gallery.name,
            status: "finished"
          });
        });
        return;
      }
      this.uploadGalleryList = this.$refs.uploadGallery.fileList;
    },
    // Upload files
    handleCoverSuccess(res, file) {
      this.formData.cover = res;
      this.uploadCoverList = this.$refs.uploadCover.fileList;
    },

    async handleRemoveCover() {
      let cover = this.formData.cover;
      this.formData.cover = "";
      const res = await this.$axios.post("remove-property-cover", {
        cover: cover
      });
      if (res.status != 200) {
        this.formData.cover = cover;
        this.feedback(
          "error",
          "Erro de operação",
          "Algo correu mal e a imagem não foi iliminada"
        );
        return;
      }
      this.uploadCoverList = this.$refs.uploadCover.clearFiles();
    },

    // =================================================

    handleGallerySuccess(res, file) {
      this.formData.galleries.push({ name: res });
      this.uploadGalleryList = this.$refs.uploadGallery.fileList;
    },

    async handleRemoveGallery(item, k) {
      let gallery = this.formData.galleries[k].name;

      this.formData.galleries.splice(k, 1);

      const res = await this.$axios.post("remove-property-gallery", {
        gallery: gallery
      });

      if (res.status != 200) {
        this.formData.galleries.push({ name: gallery });
        this.feedback(
          "error",
          "Erro de operação",
          "Algo correu mal e a imagem não foi iliminada"
        );
        return;
      }
      this.uploadGalleryList.splice(k, 1);
    },

    // =================================================

    propertyForm1Error() {
      if (this.backend_form_errors && this.showFormErrors("name")) return false;
      return true;
    },

    nextStep(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.step++;
        }
      });
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
          this.$validator.reset();

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
              this.$validator.reset();
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

<style lang="css">
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
