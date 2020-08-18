/**
 * Neste processo, para cada chamada ao backend será verificado.
 * No caso de houver erro irá colocar a msg de erro no store para se apresentar para a plicação
 * No caso de sucesso irá limpar os erros do store
 */
export default function({ $axios, store, redirect, app }) {
  // $axios.setHeader("X-Requested-With", "XMLHttpRequest");

  $axios.onError(error => {
    console.log(error);
    if (error.response.status === 422) {
      store.dispatch(
        "validationErrors/setFormErrors",
        error.response.data.errors
      );
    }

    if (error.response.status === 401) {
      // redirect("/login");
      // app.$swal({
      //   icon: "warning",
      //   title: "Autorização",
      //   text: "Reinicie a sua sessão para atualizar o Token",

      //   confirmButtonText: "Ok",
      //   timer: 6000,
      //   timerProgressBar: true
      // });
      return;
    }

    if (error.response.status === 403) {
      redirect("/");
      app.$swal({
        icon: "warning",
        title: "Área Restrita",
        text:
          "Pelo o que parece não tens permissão necessária para acessar esta página",
        footer:
          "No caso de engano, <a href = 'mailto: kenny.devex@gmail.com'>Contacte</a>  o administrador do sistema",
        confirmButtonText: "Ciente",
        timer: 6000,
        timerProgressBar: true
      });
      return;
    }
    return Promise.reject(error);
  });

  $axios.onRequest(() => {
    store.dispatch("validationErrors/clearFormErrors");
  });
}
