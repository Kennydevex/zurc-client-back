<template>
  <v-card>
    <v-card-title>
      <span class="primary--text font-weight-regular">{{
        creating ? "Criar permissões" : "Atualizar permissões"
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
              label="Permissão*"
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
              v-model="formData.roles"
              :items="roles"
              clearable
              multiple
              item-text="name"
              item-value="id"
              name="roles"
              label="Vincular Funções"
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
          creating
            ? toggleCreatePermissionDialog()
            : toggleUpdatePermissionDialog()
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
          @click.stop="addPermission(false)"
          >Registar e Sair</v-btn
        >

        <v-btn
          class="text-none"
          text
          small
          :ripple="false"
          color="primary"
          @click.stop="addPermission(true)"
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
        @click.stop="updatePermission()"
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
  name: "PermissionForm",
  props: ["formData", "creating"],
  mixins: [dateFormat, alerts],

  data() {
    return {
      sending: false
    };
  },

  computed: {
    ...mapGetters({
      roles: "permissions/roles"
    })
  },

  methods: {
    async addPermission(addNew) {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          this.sending = true;
          await this.$axios
            .post("permissions", this.$props.formData)
            .then(res => {
              this.sending = false;
              this.feedback("success", res.data.msg);
              this.resetForm();
              this.$validator.reset();
              process.client
                ? window.getApp.$emit("APP_UPDATE_PERMISSIONS_DATA")
                : "";
            });

          if (!addNew) {
            this.toggleCreatePermissionDialog();
          }
        }
      } catch (error) {
        this.sending = false;
      }
    },

    async updatePermission() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          await this.$axios
            .put(`permissions/${this.$props.formData.id}`, this.$props.formData)
            .then(res => {
              this.toggleUpdatePermissionDialog();
              this.feedback("success", res.data.msg);
              this.resetForm();
              this.$validator.reset();
              process.client
                ? window.getApp.$emit("APP_UPDATE_PERMISSIONS_DATA")
                : "";
            });
        }
      } catch (error) {}
    },

    toggleCreatePermissionDialog() {
      this.$store.commit("permissions/toggleCreatePermissionDialog");
    },
    toggleUpdatePermissionDialog() {
      this.$store.commit("permissions/toggleUpdatePermissionDialog");
    }
  }
};
</script>
