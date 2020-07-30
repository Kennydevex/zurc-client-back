/**
 * Neste processo, para cada chamada ao backend será verificado.
 * No caso de houver erro irá colocar a msg de erro no store para se apresentar para a plicação
 * No caso de sucesso irá limpar os erros do store
 */
export default function({ $axios, store, app }) {
  $axios.onError(error => {
    if (error.response.status === 422) {
      store.dispatch(
        "validationErrors/setFormErrors",
        error.response.data.errors
      );
      // app.$swal({
      //   type: "error",
      //   title: "title",
      //   text: "text"
      // });
    }
    return Promise.reject(error);
  });

  $axios.onRequest(() => {
    store.dispatch("validationErrors/clearFormErrors");
  });
}
