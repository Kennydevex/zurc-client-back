<template>
  <base-info-card title="Redes Sociais">
    <a
      v-for="social in socials"
      :key="social.id"
      class="mb-8 grey--text body-1 d-block text-none"
      :href="social.link"
      v-html="`&rsaquo; ${social.name}`"
      target="_blank"
    />
  </base-info-card>
</template>

<script>
export default {
  name: "SectionFeaturesAlt",

  data() {
    return {
      socials: [
        { name: "Facebook", link: "https://facebook.com" },
        { name: "Twitter", link: "https://twitter.com" },
        { name: "Linkedin", link: "https://linkedin.com" }
      ]
    };
  }
};
</script>
