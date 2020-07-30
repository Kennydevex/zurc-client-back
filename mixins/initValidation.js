import validationDictionary from "@/api/validationDictionary";
export const dictionary = {
  data() {
    return {
      dictionary: validationDictionary
    };
  },

  mounted() {
    this.$validator.localize("pt", this.dictionary);
  }
};
