<template>
  <v-card>
    <v-card-title>
      <span class="primary--text font-weight-regular">{{
        creating ? "Criar função" : "Atualizar função"
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
              label="Nome da função*"
              v-validate="'required|alpha_spaces'"
              data-vv-name="name"
              :error-messages="showFormErrors('name') || errors.collect('name')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" class="mb-0 py-0">
            <v-autocomplete
            chips
            small-chips
            hide-details
              dense
              v-model="formData.permissions"
              :items="permissions"
              clearable
              multiple
              item-text="name"
              item-value="id"
              name="permissions"
              label="Vincular permissões"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="text-none"
        text
        small
        :ripple="false"
        color="accent"
        @click.stop="
          creating ? toggleCreateRoleDialog() : toggleUpdateRoleDialog()
        "
        >Cancelar</v-btn
      >

      <template v-if="creating">
        <v-btn
          class="text-none"
         text
          small
          :ripple="false"
          color="primary"
          @click.stop="addRole(false)"
          >Registar e Sair</v-btn
        >

        <v-btn
          class="text-none"
          text
          small
          :ripple="false"
          color="primary"
          @click.stop="addRole(true)"
          >Registar e Novo</v-btn
        >
      </template>

      <v-btn
        v-if="!creating"
        class="text-none"
        text
        small
        :ripple="false"
        color="primary"
        @click.stop="updateRole()"
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
  name: "RoleForm",
  props: ["formData", "creating"],
  mixins: [dateFormat, alerts],

  data() {
    return {
      sending: false
    };
  },

  computed: {
    ...mapGetters({
      permissions: "permissions/permissions"
    })
  },

  methods: {
    async addRole(addNew) {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          this.sending = true;
          await this.$axios.post("roles", this.$props.formData).then(res => {
            this.sending = false;
            this.feedback("success", res.data.msg);
            this.resetForm();
            this.$validator.reset();
            process.client
              ? window.getApp.$emit("APP_UPDATE_ROLES_DATA")
              : "";
          });

          if (!addNew) {
            this.toggleCreateRoleDialog();
          }
        }
      } catch (error) {
        this.sending = false;
      }
    },

    async updateRole() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios
            .put(`roles/${this.$props.formData.id}`, this.$props.formData)
            .then(res => {
              this.toggleUpdateRoleDialog();
              this.feedback("success", res.data.msg);
              this.resetForm();
              this.$validator.reset();
              process.client
                ? window.getApp.$emit("APP_UPDATE_ROLES_DATA")
                : "";
            });
        }
      } catch (error) {}
    },

    toggleCreateRoleDialog() {
      this.$store.commit("permissions/toggleCreateRoleDialog");
    },
    toggleUpdateRoleDialog() {
      this.$store.commit("permissions/toggleUpdateRoleDialog");
    }
  }
};
</script>
