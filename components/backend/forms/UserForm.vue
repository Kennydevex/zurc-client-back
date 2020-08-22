<template>
  <v-card>
    <v-card-title>
      <span class="primary--text font-weight-regular"
        >Registo de Utilizador</span
      >
    </v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" class="py-0">
            <v-subheader>Dados Pessoais</v-subheader>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="formData.person.name"
              dense
              name="name"
              label="Nome completo*"
              v-validate="'required|alpha_spaces'"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              dense
              label="Número"
              name="phone"
              v-model.trim="formData.person.phone"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              dense
              name="gender"
              :items="genders"
              item-text="name"
              item-value="id"
              v-model.trim="formData.person.gender"
              label="Sexo"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <input
              style="display:none"
              name="birthday_target"
              ref="birthday_ref"
              v-model="actual_date"
              type="text"
            />
            <v-menu
              v-model="birthday_menu"
              :close-on-content-click="false"
              :nudge-right="30"
              transition="scale-transition"
              offset-y
              min-width="200px"
              ref="birthday_menu_ref"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  dense
                  name="birthday"
                  :value="formated(formData.person.birthday)"
                  label="Birthday"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-on="on"
                  v-validate="'date_format:dd/MM/yyyy|before:birthday_ref'"
                  data-vv-as="birthday"
                  :error-messages="errors.collect('birthday')"
                ></v-text-field>
                <!-- error-messages="Teste" -->
              </template>
              <v-date-picker
                no-title
                ref="birthday_picker_ref"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                v-model="formData.person.birthday"
                @input="birthday_menu = false"
                locale="pt-pt"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" class="py-0">
            <v-subheader>Dados da Conta</v-subheader>
          </v-col>
          <v-col cols="12" :md="creating ? '12' : '6'">
            <v-text-field
              v-model.trim="formData.email"
              dense
              label="Email*"
              v-validate="'required|email'"
              name="email"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" v-if="creating">
            <v-text-field
              v-model.trim="formData.password"
              dense
              label="Password*"
              name="password"
              type="password"
              v-validate="'required|min:8'"
              data-vv-name="password"
              :error-messages="errors.collect('password')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model.trim="formData.username"
              dense
              name="username"
              label="Username*"
              v-validate="'required|alpha_dash'"
              data-vv-name="username"
              :error-messages="errors.collect('username')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="py-0">
            <v-subheader>Permissões e Acessos</v-subheader>
          </v-col>

          <v-col cols="12" md="6" class="py-0">
            <v-autocomplete
              outlined
              rounded
              chips
              name="roles"
              :items="roles"
              item-text="name"
              item-value="id"
              multiple
              v-model.trim="formData.roles"
              label="Funções"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6" class="my-0 py-0">
            <v-autocomplete
              outlined
              rounded
              chips
              name="permissions"
              :items="permissions"
              item-text="name"
              item-value="id"
              multiple
              v-model.trim="formData.permissions"
              label="Permissões"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6" class="my-0 py-0">
            <v-subheader>Ativação</v-subheader>
            <v-switch
              v-model="formData.status"
              :label="formData.status ? 'Ativo' : 'Inativo'"
              color="indigo"
              value
              input-value="true"
              hide-details
            ></v-switch>
          </v-col>
        </v-row>
      </v-form>
      <small>*Prenchimento Obrigatório</small>
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
          creating ? toggleCreateUserDialog() : toggleUpdateUserDialog()
        "
        >Cancelar</v-btn
      >
      <v-btn
        v-if="creating"
        class="text-none"
        text
        depressed
        small
        :ripple="false"
        color="primary"
        @click.stop="addUser(false)"
        >Registar e Sair</v-btn
      >

      <v-btn
        v-if="creating"
        class="text-none"
        text
        depressed
        small
        :ripple="false"
        color="primary"
        @click.stop="addUser(true)"
        >Registar e Novo</v-btn
      >

      <v-btn
        v-if="!creating"
        class="text-none"
        text
        depressed
        small
        :ripple="false"
        color="primary"
        @click.stop="updateUser()"
        >Guardar Arterações</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat } from "@/mixins/dateTime";

export default {
  name: "UserForm",
  props: ["formData", "creating"],
  mixins: [dateFormat],

  data() {
    return {
      sending: false,
      birthday_menu: false,
      genders: [
        { id: "1", name: "Masculino" },
        { id: "2", name: "Feminino" },
        { id: "3", name: "Outros" }
      ]
    };
  },

  computed: {
    ...mapGetters({
      roles: "permissions/roles",
      permissions: "permissions/permissions"
    })
  },

  watch: {
    birthday_menu(val) {
      val &&
        setTimeout(
          () => (this.$refs.birthday_picker_ref.activePicker = "YEAR")
        );
    }
  },

  methods: {
    async addUser(addNew) {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          // this.sending = true;
          await this.$axios.post("users", this.$props.formData);
          // this.sending = false;

          if (!addNew) {
            this.toggleCreateUserDialog();
          }
          this.resetForm();
          this.$validator.reset();

          process.client ? window.getApp.$emit("APP_UPDATE_USERS_DATA") : "";
        }
      } catch (error) {
        // this.sending = false;
      }
    },

    async updateUser() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios.put(
            `users/${this.$props.formData.id}`,
            this.$props.formData
          );

          this.toggleUpdateUserDialog();
          this.resetForm();
          this.$validator.reset();

          process.client ? window.getApp.$emit("APP_UPDATE_USERS_DATA") : "";
        }
      } catch (error) {}
    },

    toggleCreateUserDialog() {
      this.$store.commit("dialogs/toggleCreateUserDialog");
    },
    toggleUpdateUserDialog() {
      this.$store.commit("dialogs/toggleUpdateUserDialog");
    }
  }
};
</script>
