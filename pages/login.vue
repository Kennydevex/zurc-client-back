<template>
  <v-app id="login">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card tile class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <v-avatar size="70" color="primary">
                    <v-icon x-large dark>mdi-login</v-icon>
                  </v-avatar>
                  <h3 class="font-weight-thin">Zurconstroi</h3>
                  <h1 class="flex my-4 primary--text font-weight-light">
                    Login
                  </h1>
                </div>
                <div>
                  <v-alert
                    :value="auth_401_errors ? true : false"
                    tile
                    transition="scale-transition"
                    border="left"
                    colored-border
                    type="error"
                    elevation="2"
                  >
                    {{ auth_401_errors }}
                  </v-alert>
                </div>
                <v-form>
                  <v-text-field
                    name="login"
                    label="Email"
                    type="text"
                    v-model.trim="formData.email"
                    v-validate="'required|email'"
                    data-vv-name="email"
                    :error-messages="
                      showFormErrors('email') || errors.collect('email')
                    "
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    :type="show_password ? 'text' : 'password'"
                    v-model.trim="formData.password"
                    @click:append="show_password = !show_password"
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                    v-validate="'required|min:8'"
                    data-vv-name="password"
                    :error-messages="
                      showFormErrors('password') || errors.collect('password')
                    "
                  ></v-text-field>
                </v-form>
                <v-btn
                  nuxt
                  to="/register"
                  :ripple="false"
                  class="pa-0 ma-0 text-none text-decoration-underline"
                  text
                  x-small
                  color="primary"
                  >Registar um conta</v-btn
                >
                <small class="primary--text"
                  >&nbsp; &nbsp; | &nbsp; &nbsp;</small
                >
                <v-btn
                  nuxt
                  to="register"
                  :ripple="false"
                  class="pa-0 ma-0 text-none text-decoration-underline"
                  text
                  x-small
                  color="primary"
                  >Recuperar palavra passe</v-btn
                >

                <br />
                <v-btn
                  nuxt
                  to="/"
                  :ripple="false"
                  class="pa-0 ma-0 text-none"
                  text
                  x-small
                  color="accent"
                  >Home</v-btn
                >
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">mdi-google</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                  :disabled="errors.has('email') || errors.has('password')"
                  depressed
                  tile
                  small
                  color="primary"
                  @click="login()"
                  :loading="sending"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { dictionary } from "@/mixins/initValidation";

export default {
  name: "LoginPgae",

  middleware: ["guest"],

  mixins: [dictionary],

  head() {
    return {
      title: "Login"
    };
  },

  data() {
    return {
      sending: false,
      show_password: false,
      loading: false,
      formData: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    async login() {
      let formIsValid = await this.$validator.validateAll();
      try {
        if (formIsValid) {
          this.sending = true;
          await this.$auth.loginWith("local", {
            data: this.formData
          });
          this.sending = false;
        }

        // this.$store.dispatch("validationErrors/clearAuth401Errors");
        this.$router.push({
          // Redirecionar o utilizador para a página que pretendia abrir ou para a página de adim
          path: this.$router.query.redirect || "/admin"
        });
      } catch (error) {
        this.sending = false;
      }
    }
    // login() {
    //   this.$validator.validateAll().then(noErrorOnValidate => {
    //     if (noErrorOnValidate) {
    //       this.loading = true;
    //       setTimeout(() => {
    //         this.$router.push("/dashboard");
    //       }, 1000);
    //     }
    //   });
    // }
  }
};
</script>

<style scoped lang="css">
#login {
  background-image: url("/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
