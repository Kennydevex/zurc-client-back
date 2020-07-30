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
                    <v-icon x-large dark>mdi-account-edit</v-icon>
                  </v-avatar>
                  <h3 class="font-weight-thin">Zurconstroi</h3>
                  <h1 class="flex my-4 primary--text font-weight-light">
                    Registar
                  </h1>
                </div>
                <v-form>
                  <v-row>
                    <v-col cols="12" md="6" class="my-0 py-0">
                      <v-text-field
                        name="name"
                        label="Nome Completo"
                        type="text"
                        v-model="model.username"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-0 py-0">
                      <v-text-field
                        name="username"
                        label="Nome de Utilizador"
                        type="text"
                        v-model="model.username"
                        hint="Um identificador único do utilizador"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" class="my-0 py-0">
                      <v-text-field
                        name="email"
                        label="Email"
                        type="text"
                        v-model="model.username"
                        placeholder="exemplo@email.cv"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="my-0 py-0">
                      <v-text-field
                        name="password"
                        label="Password"
                        id="password"
                        :type="show_password ? 'text' : 'password'"
                        v-model="model.password"
                        @click:append="show_password = !show_password"
                        :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-autocomplete
                        dense
                        :items="genders"
                        item-text="name"
                        item-value="id"
                        v-model="value"
                        label="Sexo"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                </v-form>
                <v-btn
                  nuxt
                  to="/login"
                  :ripple="false"
                  class="pa-0 ma-0 text-none text-decoration-underline"
                  text
                  x-small
                  color="primary"
                  >Efetuar o login</v-btn
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
      },

      genders: [
        { id: "1", name: "Masculino" },
        { id: "2", name: "Feminino" },
        { id: "3", name: "Outros" }
      ]
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
