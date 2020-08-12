export const uploadFeedback = {
  methods: {
    handleFormatError(file) {
      this.feedback(
        "warning",
        "Erro de formato",
        "Este formáto não é suportado nesta configuração"
      );
    },
    handleMaxSize(file) {
      this.feedback(
        "warning",
        "Limite de arquivo",
        "O sistema suporta arquivo com máximo 2MB de dados"
      );
    },

    handleError(file) {
      this.feedback(
        "warning",
        "Formato do arquivo",
        `${file.errors.file.length ? file.errors.file[0] : "Algo correu mal"}`
      );
    }
  }
};
