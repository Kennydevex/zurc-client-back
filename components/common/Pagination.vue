<template>
  <div>
    <v-pagination
      v-model="current_page"
      :length="last_page"
      :total-visible="7"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: ["data_source"],
  data() {
    return {
      current_page: this.data_source.meta.current_page,
      last_page: this.data_source.meta.last_page
    };
  },

  watch: {
    current_page(newVal, oldVal) {
      this.$emit("paginate", newVal);
    }
  }
};
</script>
