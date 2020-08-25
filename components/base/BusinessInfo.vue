<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card name="Ao seu dispor" pace="6">
        Para um atendimento direfenciado, ainda podes cantactar a empresa
        atraves dos seguintes contactos
      </base-info-card>

      <base-business-contact dense />
    </div>
  </v-theme-provider>
</template>

<script>
export default {
  name: "BaseBusinessInfo",

  props: { dark: Boolean }
};
</script>
