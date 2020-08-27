<template>
  <v-theme-provider :dark="dark">
    <v-container class="pa-0">
      <v-row :justify="justify" no-gutters>
        <v-col v-if="title || subtitle" :cols="callout ? 9 : 12">
          <base-title :title="title" class="text-uppercase" space="1" />

          <base-divider :color="color" />
          <slot></slot>

          <v-card tile class="ma-1 pa-3" color="grey darken-4 elevation-8">
            <v-form ref="form" data-vv-scope="form-subscribe">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    dense
                    solo
                    outlined
                    name="name"
                    label="Email"
                    v-model="formData.email"
                    v-validate="'required|email'"
                    data-vv-name="form-subscribe.email"
                    :error-messages="
                      showFormErrors('email') ||
                        errors.collect('form-subscribe.email')
                    "
                    @keyup.enter="subscribe('form-subscribe')"
                  >
                    <template v-slot:append>
                      <v-btn
                        @click="subscribe('form-subscribe')"
                        color="primary"
                        small
                        icon
                        ><v-icon>mdi-send</v-icon></v-btn
                      >
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <small class="grey--text lighten-4">
                    Subscreva para receberes publicações em primeira mão
                  </small>
                </v-col>
              </v-row>
            </v-form>

            <v-row>
              <v-col cols="12">
                <v-dialog
                  v-model="unsubscribe_dialog"
                  persistent
                  max-width="460px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      v-bind="attrs"
                      v-on="on"
                      text
                      color="grey lighten-1"
                      class="text-none font-weight-light"
                      >Retirar a sua subscrição</v-btn
                    >
                  </template>

                  <v-card class="mx-auto" max-width="500">
                    <v-card-title
                      class="title font-weight-regular justify-space-between"
                    >
                      <span>{{ currentTitle }}</span>
                      <v-btn @click="closeDialog()" icon x-small color="error">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                    </v-card-title>

                    <v-window v-model="step">
                      <v-form ref="form" data-vv-scope="form-unsubscribe">
                        <v-window-item :value="1">
                          <v-card-text class="my-0 py-0" v-if="err_msg">
                            <v-alert
                              dense
                              tile
                              color="error"
                              icon="mdi-email-alert"
                              border="right"
                              colored-border
                              dismissible
                              elevation="3"
                              transition="scale-transition"
                            >
                              <small>{{ err_msg }}</small>
                            </v-alert>
                          </v-card-text>
                          <v-card-text>
                            <v-text-field
                              v-model="email"
                              label="Email"
                              name="cancel_email"
                              placeholder="Introduza o email registado"
                              v-validate="'required|email'"
                              data-vv-name="form-unsubscribe.cancel_email"
                              :error-messages="
                                errors.collect('form-unsubscribe.cancel_email')
                              "
                              hint="Por favor seja claro e direto com a sua mensagem..."
                            ></v-text-field>
                            <span class="caption grey--text text--darken-1"
                              >Introduza o email que corresponde à respectiva
                              subscrição</span
                            >
                          </v-card-text>
                        </v-window-item>
                        <v-window-item :value="2">
                          <v-card-text class="my-0 py-0" v-if="unsub_err_msg">
                            <v-alert
                              v-model="unsubscribe_alert"
                              dense
                              tile
                              color="error"
                              icon="mdi-form-textbox-password"
                              border="right"
                              colored-border
                              dismissible
                              elevation="3"
                              transition="scale-transition"
                            >
                              <small>{{ unsub_err_msg }}</small>
                            </v-alert>
                          </v-card-text>
                          <v-card-text>
                            <v-text-field
                              v-model="code"
                              label="Código de confirmação"
                              name="code"
                              v-validate="'required'"
                              data-vv-name="form-unsubscribe.code"
                              :error-messages="
                                errors.collect('form-unsubscribe.code')
                              "
                            ></v-text-field>
                            <span class="caption grey--text text--darken-1"
                              >Copie o código que foi lhe enviado por email e
                              cole-o aqui</span
                            >
                          </v-card-text>
                        </v-window-item>
                      </v-form>
                    </v-window>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <!-- <v-btn small :disabled="step === 1" text @click="step--">Anterior</v-btn> -->
                      <v-spacer></v-spacer>
                      <v-btn
                        small
                        text
                        v-if="step < 2"
                        color="primary"
                        depressed
                        @click="nextStep('form-unsubscribe')"
                        :loading="sending"
                      >
                        Seguinte
                        <template v-slot:loader>
                          <span>Verificando...</span>
                        </template>
                      </v-btn>
                      <v-btn
                        small
                        text
                        v-if="step === 2"
                        color="primary"
                        @click="unSubscribe('form-unsubscribe')"
                        @keyup.enter="unSubscribe('form-unsubscribe')"
                        depressed
                        >Enviar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col v-if="callout" cols="2">
          <div
            class="display-3 grey--text text--lighten-3 font-weight-bold pr-8"
            v-text="callout"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
// Mixins
import Heading from "@/mixins/heading";
import { alerts } from "@/mixins/appAlerts";

export default {
  name: "BaseInfoCard",

  mixins: [Heading, alerts],

  props: {
    dark: Boolean,
    callout: String,
    color: {
      type: String,
      default: "primary"
    },
    icon: String,
    subtitle: String,
    text: String,
    title: String
  },

  data() {
    return {
      formData: {
        id: "",
        email: ""
      },
      sending: false,
      step: 1,
      code: "",
      email: "",

      err_msg: "",
      unsub_err_msg: "",
      unsubscribe_dialog: false,
      unsubscribe_alert: false
    };
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Email subscrito";
        case 2:
          return "Verificação";
        default:
          return "Canselar subscrição";
      }
    }
  },

  methods: {
    async nextStep(scope) {
      this.sending = false;
      let formIsValid = await this.$validator.validateAll(scope);
      try {
        if (formIsValid) {
          this.sending = true;

          await this.$axios
            .get(`verify-subscriber/${this.$data.email}`)
            .then(res => {
              if (!res.data.exist) {
                this.err_msg = res.data.msg;
                this.sending = false;

                return;
              }
              this.sending = false;
              this.step++;
              this.err_msg = res.data.msg;
            });
        }
      } catch (error) {
        this.sending = false;
        this.err_msg =
          "Ocorreu algum problema com a sua operação, tente novamente";
      }
    },

    async unSubscribe(scope) {
      this.unsubscribe_alert = true;
      this.unsub_err_msg = "";
      let formIsValid = await this.$validator.validateAll(scope);
      try {
        if (formIsValid) {
          await this.$axios
            .get(`unsubscribe/${this.$data.email}/${this.$data.code}`)
            .then(res => {
              if (res.data.success) {
                this.unsubscribe_dialog = false;
                this.feedback(
                  res.data.success ? "success" : "error",
                  res.data.msg
                );
                (this.step = 1), (this.code = ""), (this.unsub_err_msg = "");
                this.resetForm();
                this.$validator.reset();
                return;
              }
              this.unsubscribe_alert = true;
              this.unsub_err_msg = "Verifique o código";
            });
        }
      } catch (error) {
        this.msg = "Ocorreu algum problema com a operação";
        this.unsubscribe_alert = true;
      }
    },

    closeDialog() {
      this.unsubscribe_dialog = false;
      this.unsubscribe_alert = false;
      this.step = 1;
      this.code = "";
      this.$validator.reset();
      this.resetForm();
    },
    async subscribe(scope) {
      let formIsValid = await this.$validator.validateAll(scope);
      try {
        if (formIsValid) {
          await this.$axios.post("subscribe", this.formData).then(res => {
            this.feedback("success", "Subscrito", res.data.msg);
            this.resetForm();
            this.$validator.reset();
          });
        }
      } catch (error) {}
    }
  }
};
</script>
