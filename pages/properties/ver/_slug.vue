<template>
  <div>
    {{ slug }}
  </div>
</template>

<script>
export default {
  name: "PropertyInfo",
  layout: "frontend",

  data() {
    return {
      slug: this.$route.params.slug
    };
  }
};
</script>
