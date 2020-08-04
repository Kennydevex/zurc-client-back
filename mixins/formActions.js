import { alerts } from "@/mixins/appAlerts";

export const deleteDatas = {
  mixins: [alerts],
  data() {
    return {
      ids: [],
      deleting: {}
      // selected: [] Uma variavel declarada no componente
    };
  },
  methods: {
    handleDeleteMultiple() {
      let mthis = this;
      this.ids = [];
      // Já declarada no componente
      this.selected.forEach(function(selected) {
        mthis.ids.push(selected.id);
      });
      return this.ids;
    },

    onDelete(url, id, refresh_data, multiple_delete = false) {
      if (multiple_delete) {
        this.handleDeleteMultiple();
      } else {
        this.ids = id;
      }
      this.deleteAlert(
        "Eliminar Registo(s) ",
        this.selected.length > 1 && multiple_delete
          ? "Preste a Eliminar " + this.selected.length + " Registos"
          : "Eliminar este Registo"
      ).then(result => {
        if (result.value) {
          this.selected = [];
          this.delete(url, this.ids, refresh_data);
          this.ids = [];
        }
      });
    },

    async delete(url, id, refresh_data) {
      this.$set(this.deleting, id, true);
      let { msg } = await this.$axios.$delete(`/${url}/${id}`);
      this.$set(this.deleting, id, false);
      this.feedback("success", msg);
      // Depois de eliminar registo, atualizar os dados
      process.client ? window.getApp.$emit(refresh_data) : "";
    }
  }
};

export const handleActivations = {
  mixins: [alerts],
  data() {
    return {
      loadAtivaction: {}
    };
  },
  methods: {
    toggleStatus(url, id, status, entity, refresh_data) {
      this.$set(this.loadAtivaction, id, false);
      this.activationAlert(status, entity).then(result => {
        if (result.value) {
          this.$set(this.loadAtivaction, id, true);
          this.$axios.$put(`${url}/${id}`).then(res => {
            this.feedback("success", res.msg);
            this.$set(this.loadAtivaction, id, false);
            process.client ? window.getApp.$emit(refresh_data) : "";
          });
        }
      });
    }
  }
};
