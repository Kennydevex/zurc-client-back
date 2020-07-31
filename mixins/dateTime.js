export const dateFormat = {
  computed: {
    actual_date() {
      return this.$moment(new Date().toISOString().substr(0, 10)).format(
        "DD/MM/YYYY"
      );
    }
  },
  methods: {
    formated(date) {
      return date ? this.$moment(date).format("DD/MM/YYYY") : "";
    },

    dateForHumanPresentation(date) {
      return date ? this.$moment(date).fromNow() : "";
    },

    displayDate(date) {
      return date ? this.$moment().format("LL") : "";
    },

    displayDayAndMonth(date) {
      return date ? this.$moment().format("MM-YYYY") : "";
    }
  }
};
