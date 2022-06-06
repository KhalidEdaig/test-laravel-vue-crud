import CategoriesService from "@/services/api/categories.service";
import ProductsService from "@/services/api/products.service";
export const products = {
  namespaced: true,
  state: {
    allCategories: [],
    products: [],
    pagination: null,
    deleteModal: {
      show: false,
      loading: false,
      productTodeleteId: null,
    },
    addOrEditModal: {
      show: false,
      loading: false,
      mode: null,
      product: {
        name: "",
        description: "",
        price: "",
        category_id: "",
      },
    },
  },
  actions: {
    GET_PRODUCTS({ commit }, payload) {
      return ProductsService.getProducts(payload).then((response) => {
        commit("SET_PRODUCTS", response.products);
        commit("SET_PAGINATION", response.meta);
      });
    },
    DELETE_PRODUCT({ commit, state }) {
      return ProductsService.deleteProduct(
        state.deleteModal.productTodeleteId
      ).then(() => {
        commit("DELETE_PRODUCT", state.deleteModal.productTodeleteId);
      });
    },
    ADD_OR_EDIT_PRODUCT({ state, dispatch, commit }) {
      let payload = (({ id, name, description, price, category_id }) => ({
        id,
        name,
        description,
        price,
        category_id,
      }))(state.addOrEditModal.product);
      if (state.addOrEditModal.mode === "add") {
        return ProductsService.addProduct(payload).then((response) => {
          commit("ADD_PRODUCT", response);
          commit("EMPTY_FORM");

          dispatch(
            "display/DISPLAY_NOTIFICATION",
            {
              title: "Produit ajouté !",
              subtitle: "Le Produit a été ajoutée avec succes",
            },
            { root: true }
          );
        });
      }
      return ProductsService.editProduct(payload).then((response) => {
        commit("EDIT_PRODUCT", response);
        commit("EMPTY_FORM");
        dispatch(
          "display/DISPLAY_NOTIFICATION",
          {
            title: "Produit modifié !",
            subtitle: "les informations de ce Produit ont été modifiées.",
          },
          { root: true }
        );
      });
    },
    GET_ALL_CATEGORIES({ commit }) {
      return CategoriesService.getAllCategories().then((response) => {
        commit("SET_ALL_CATEGORIES", response);
      });
    },
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },
    SET_ALL_CATEGORIES(state, categories) {
      state.allCategories = categories;
    },
    DELETE_PRODUCT(state, id) {
      const index = state.products.findIndex((p) => p.id === id);
      state.products.splice(index, 1);
      state.deleteModal.show = false;
      state.deleteModal.loading = false;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
      state.addOrEditModal.show = false;
    },
    EDIT_PRODUCT(state, newCompany) {
      const index = state.products.findIndex(
        (product) => product.id === newCompany.id
      );
      state.products.splice(index, 1, newCompany);
      state.addOrEditModal.show = false;
    },
    SET_DELETE_MODAL(state, payload) {
      if (payload.productId)
        state.deleteModal.productTodeleteId = payload.productId;
      state.deleteModal.show = payload.state;
    },
    SET_ADD_OR_EDIT_MODAL(state, payload) {
      state.addOrEditModal.product.name = "";
      state.addOrEditModal.product.description = "";
      state.addOrEditModal.product.price = "";
      state.addOrEditModal.product.category_id = "";
      if (payload.mode === "edit")
        state.addOrEditModal.product = Object.assign({}, payload.product);
      state.addOrEditModal.mode = payload.mode;
      state.addOrEditModal.show = payload.state;
    },
    UPDATE_NAME(state, name) {
      state.addOrEditModal.product.name = name;
    },
    UPDATE_DESCRIPTION(state, description) {
      state.addOrEditModal.product.description = description;
    },
    UPDATE_PRICE(state, price) {
      state.addOrEditModal.product.price = price;
    },

    UPDATE_CATEGORY_ID(state, category_id) {
      state.addOrEditModal.product.category_id = category_id;
    },

    EMPTY_FORM(state) {
      state.addOrEditModal.product.name = "";
      state.addOrEditModal.product.price = "";
      state.addOrEditModal.product.description = "";
      state.addOrEditModal.product.category_id = "";
    },
  },
};
