<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card title="Mantenha em contacto connosco" pace="6">
        Utilize as informações de contacto e localização apresemtada a seguir
        para entrar em contacto connosco. Da nossa parte será um prazer atender
        as suas necessidades.
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
