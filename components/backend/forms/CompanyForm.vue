<template>
  <div>
    <form ref="form">
      <v-row>
        <v-col cols="12" class="py-0">
          <v-subheader>
            Informações básicas
          </v-subheader>
        </v-col>
        <v-col cols="12" class="py-0">
          <v-text-field
            v-model.trim="formData.name"
            v-validate="'required|alpha_spaces'"
            data-vv-name="name"
            :error-messages="showFormErrors('name') || errors.collect('name')"
            name="name"
            label="Nome da empresas"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="6" class="py-0">
          <input
            style="display:none"
            name="released_target"
            ref="released_ref"
            v-model="actual_date"
          />
          <v-menu
            v-model="released_menu"
            :close-on-content-click="false"
            :nudge-right="30"
            transition="scale-transition"
            offset-y
            min-width="200px"
            ref="released_menu_ref"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                name="released"
                :value="formated(formData.released)"
                label="Data de lançamento da empresa"
                prepend-inner-icon="mdi-calendar"
                readonly
                v-on="on"
                v-validate="'date_format:dd/MM/yyyy|before:released_ref'"
                data-vv-as="released"
                :error-messages="errors.collect('released')"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              ref="released_picker_ref"
              :max="new Date().toISOString().substr(0, 10)"
              min="1950-01-01"
              v-model="formData.released"
              @input="released_menu = false"
              locale="pt-pt"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" md="6" class="py-0">
          <v-text-field
            v-model.trim="formData.nif"
            v-validate="'required|numeric'"
            data-vv-name="nif"
            v-mask="'###########'"
            placeholder="00000000000"
            :error-messages="showFormErrors('nif') || errors.collect('nif')"
            name="nif"
            label="NIF"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col cols="12">
          <v-subheader>Contactos da empresa</v-subheader>
        </v-col>

        <v-col cols="12" class="my-0 py-0">
          <template v-for="(contact, k) in formData.contacts">
            <v-row :key="k + 'contact'">
              <v-col cols="12" md="2" class="my-0 py-0">
                <v-autocomplete
                  v-model="contact.type"
                  label="Tipo de Contacto"
                  :items="[
                    { id: '1', name: 'Tel(Móvel)' },
                    { id: '2', name: 'Email' }
                  ]"
                  item-text="name"
                  item-value="id"
                  :prepend-inner-icon="
                    contact.type == 1 ? 'mdi-phone' : 'mdi-email'
                  "
                  @change="contact.contact = contact.description = ''"
                ></v-autocomplete>
              </v-col>

              <v-col
                cols="12"
                :md="contact.type == 1 ? '3' : '4'"
                class="my-0 py-0"
              >
                <v-text-field
                  v-if="contact.type == 1"
                  :name="'contact' + k"
                  :label="'Telefone/Móvel ' + (k + 1)"
                  v-mask="'(+238) ###-##-##'"
                  placeholder="(+238) 000-00-00"
                  v-model.trim="contact.contact"
                  v-validate="'required|length:16'"
                  :data-vv-name="'contact' + k"
                  :error-messages="
                    showFormErrors('contacts.' + k + '.contact') ||
                      errors.collect('contact' + k)
                  "
                  @change="findRepeatedContact(contact.contact, k)"
                  hint="Insira um número de telefone válido"
                ></v-text-field>

                <v-text-field
                  v-else
                  :name="'contact' + k"
                  :label="'Correio Eletronico ' + (k + 1)"
                  placeholder="exemplo@email.com"
                  v-model.trim="contact.contact"
                  v-validate="'required|email'"
                  :data-vv-name="'contact' + k"
                  :error-messages="
                    showFormErrors('contacts.' + k + '.contact') ||
                      errors.collect('contact' + k)
                  "
                  @change="findRepeatedContact(contact.contact, k)"
                  hint="Insira um correio eletrónico válido e em utilização na empresa"
                ></v-text-field>
              </v-col>

              <v-col
                cols="12"
                :md="contact.type == 1 ? '7' : '6'"
                class="my-0 py-0"
              >
                <v-text-field
                  :disabled="!contact.contact"
                  :name="'description' + k"
                  :label="
                    contact.type == 1
                      ? 'Descrição do número ' + (k + 1)
                      : 'Descrição do email ' + (k + 1)
                  "
                  v-model.trim="contact.description"
                  v-validate="'required|max:200'"
                  :data-vv-name="'description' + k"
                  :error-messages="
                    showFormErrors('contacts.' + k + '.description') ||
                      errors.collect('description' + k)
                  "
                  :hint="
                    contact.type == 1
                      ? 'Apresente uma pequena descrição do número ' +
                        contact.contact
                      : 'Apresente uma pequena descrição do  email ' +
                        contact.contact
                  "
                >
                  <template v-slot:append-outer>
                    <v-btn
                      outlined
                      icon
                      small
                      color="error"
                      class="ma-1"
                      @click="removeContact(k)"
                      v-show="k || (!k && formData.contacts.length > 1)"
                    >
                      <v-icon small>mdi-minus</v-icon>
                    </v-btn>

                    <v-btn
                      :disabled="canAddContact(k)"
                      outlined
                      icon
                      small
                      class="ma-1"
                      :color="repeatedContact ? 'error' : 'primary'"
                      @click="repeatedContact ? '' : moreContact(k)"
                      v-show="k == formData.contacts.length - 1"
                    >
                      <v-icon v-if="repeatedContact" small>mdi-alert</v-icon>
                      <v-icon v-else small>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </template>
          <v-row>
            <v-col cols="12" v-if="repeatedContact">
              <small class="error--text">
                <v-icon color="error" small>mdi-alert</v-icon>Verefique os
                campos porque existe contactos repitidos, caso contrário os
                dados não serão guardados na base de dados!!
              </small>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" class="py-0">
          <v-subheader>Endereço e localização</v-subheader>
        </v-col>
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
            v-model="formData.location.zone"
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

        <v-col cols="12" sm="6" md="3" class="py-0">
          <v-text-field
            type="number"
            name="lat"
            label="Latitude"
            v-model.trim="formData.location.geo.lat"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="3" class="py-0">
          <v-text-field
            type="number"
            name="lng"
            label="Longitude"
            v-model.trim="formData.location.geo.lng"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col align="end">
          <v-subheader>Sobre empresa</v-subheader>
        </v-col>
        <v-col cols="12">
          <v-textarea
            filled
            auto-grow
            label="Sobre"
            name="about"
            hint="Fale um pouco sobre a atuação da empresa"
            v-model.trim="formData.about"
            v-validate="'max:2000'"
            data-vv-name="about"
            :error-messages="showFormErrors('about') || errors.collect('about')"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col align="end">
          <v-btn
            class="text-none"
            color="accent"
            @click="redirectToPage('admin/companies')"
            text
            >Cancelar</v-btn
          >
          <v-btn
            @click="creating ? addCompany() : updateCompany()"
            class="text-none"
            color="primary"
            text
            >{{ creating ? "Guardar e sair" : "Guardar Alerações" }}</v-btn
          >
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import { dateFormat } from "@/mixins/dateTime";
import { alerts } from "@/mixins/appAlerts";

export default {
  name: "CompanyForm",
  props: ["formData", "creating"],
  mixins: [dateFormat, alerts],

  data() {
    return {
      sending: false,
      released_menu: false,
      repeatedContact: false
    };
  },

  watch: {
    birthday_menu(val) {
      val &&
        setTimeout(
          () => (this.$refs.released_picker_ref.activePicker = "YEAR")
        );
    }
  },

  methods: {
    addFormData(index, obj, objEl) {
      obj.push(objEl);
    },

    removeFormData(index, obj) {
      obj.splice(index, 1);
    },

    canAddContact(k) {
      if (
        this.formData.contacts[k].contact == "" ||
        this.formData.contacts[k].description == ""
      )
        return true;

      return false;
    },

    findRepeatedContact(contact, pos) {
      for (var i = 0; i < this.formData.contacts.length - 1; i++) {
        if (this.formData.contacts[i].contact == contact && i != pos) {
          this.repeatedContact = true;
          return;
        }
        this.repeatedContact = false;
      }
      return;
    },

    moreContact(index) {
      this.addFormData(index, this.formData.contacts, {
        id: "",
        contact: "",
        description: "",
        type: "1"
      });
    },

    removeContact(index) {
      this.removeFormData(index, this.formData.contacts);
    },

    async addCompany() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios
            .post("companies", this.$props.formData)
            .then(res => {
              this.redirectToPage("admin/companies");
              this.resetForm();
              this.$validator.reset();

              this.feedback("success", res.data.msg);
              process.client
                ? window.getApp.$emit("APP_UPDATE_COMPANIES_DATA")
                : "";
            });
        }
      } catch (error) {}
    },

    async updateCompany() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios
            .put(`companies/${this.$props.formData.slug}`, this.$props.formData)
            .then(res => {
              this.redirectToPage("admin/companies");
              this.resetForm();
              this.$validator.reset();
              this.feedback("success", res.data.msg);
              process.client
                ? window.getApp.$emit("APP_UPDATE_COMPANIES_DATA")
                : "";
            });
        }
      } catch (error) {}
    }
  }
};
</script>
