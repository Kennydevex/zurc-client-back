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
                <v-form>
                  <v-text-field
                    name="login"
                    label="Login"
                    type="text"
                    v-model="model.username"
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    :type="show_password ? 'text' : 'password'"
                    v-model="model.password"
                    @click:append="show_password = !show_password"
                    :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                  ></v-text-field>
                </v-form>
                <v-btn
                  nuxt
                  to="register"
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

                <v-btn small text :to="{ name: 'index' }" :loading="loading"
                  >Voltar</v-btn
                >
                <v-btn
                  depressed
                  tile
                  small
                  color="primary"
                  @click="login"
                  :loading="loading"
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
export default {
  data() {
    return {
      show_password: false,
      loading: false,
      model: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    login() {
      this.loading = true;
      setTimeout(() => {
        this.$router.push("/dashboard");
      }, 1000);
    }
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
