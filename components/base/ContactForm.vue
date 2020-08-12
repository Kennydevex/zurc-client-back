<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
    />

    <v-form ref="form">
      <v-text-field
        outlined
        dense
        v-model.trim="formData.name"
        v-validate="'required|alpha_spaces'"
        data-vv-name="name"
        :error-messages="errors.collect('name')"
        name="name"
        label="Nome"
      ></v-text-field>

      <v-text-field
        outlined
        dense
        v-model.trim="formData.email"
        v-validate="'required|email'"
        data-vv-name="email"
        :error-messages="errors.collect('email')"
        name="email"
        label="Email"
      ></v-text-field>

      <v-text-field
        outlined
        dense
        v-model.trim="formData.subject"
        v-validate="'required'"
        data-vv-name="subject"
        :error-messages="errors.collect('subject')"
        name="subject"
        label="Assunto da mensagem"
      ></v-text-field>

      <v-textarea
        outlined
        auto-grow
        label="Mensagem"
        name="message"
        v-model.trim="formData.message"
        v-validate="'required|max:500'"
        data-vv-name="message"
        :error-messages="errors.collect('message')"
      ></v-textarea>

      <!-- href="mailto:shop@vuetifyjs.com?subject=Zero%20Theme%20Question"-->
      <base-btn
        :loading="sending"
        :color="!theme.isDark ? 'accent' : 'white'"
        outlined
        target="_blank"
        @click="sendMessage()"
      >
        Enviar Mensagem
      </base-btn>
    </v-form>
  </div>
</template>

<script>
import { alerts } from "@/mixins/appAlerts";

export default {
  name: "BaseContactForm",

  mixins: [alerts],

  // Injected from the Vuetify Themeable mixin
  inject: ["theme"],

  props: {
    subtitle: String,
    title: {
      type: String,
      default: "Enviar um mensagem"
    }
  },

  data() {
    return {
      sending: false,
      formData: {
        name: "",
        email: "",
        subject: "",
        message: ""
      }
    };
  },

  methods: {
    async sendMessage() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          this.sending = true;
          await this.$axios.post("send-message", this.formData).then(res => {
            this.sending = false;
            this.resetForm();
            this.feedback("success", "Mensagem enviada", res.data.msg);
            this.$validator.reset();
          });
        }
      } catch (error) {
        this.sending = false;
      }
    }
  }
};
</script>
