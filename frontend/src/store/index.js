import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";
import { users } from "./users.module";
import { display } from "./display.module";
import { products } from "./products.module";
import { categories } from "./categories.module";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    display,
    auth,
    products,
    categories,
    users,
  },
});

export default store;
