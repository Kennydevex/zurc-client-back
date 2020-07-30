import Vue from "vue";

import pt from "vee-validate/dist/locale/pt_PT";
import VeeValidate, { Validator } from "vee-validate";

Validator.localize("pt", pt);

Vue.use(VeeValidate);
