import CategoriesService from "@/services/api/categories.service";
export const categories = {
  namespaced: true,
  state: {
    categories: [],
    all_categories: [],
    pagination: null,
    deleteModal: {
      show: false,
      loading: false,
      categoryTodeleteId: null,
    },
    addOrEditModal: {
      show: false,
      loading: false,
      mode: null,
      category: {
        name: "",
      },
    },
  },
  actions: {
    GET_CATEGORIES({ commit }, payload) {
      return CategoriesService.getCategories(payload).then((response) => {
        commit("SET_CATEGORIES", response.categories);
        commit("SET_PAGINATION", response.meta);
      });
    },
    GET_ALL_CATEGORIES({ commit }) {
      return CategoriesService.getAllCategories().then((response) => {
        commit("SET_ALL_CATEGORIES", response);
      });
    },
    DELETE_CATEGORY({ commit, state }) {
      return CategoriesService.deleteCategory(
        state.deleteModal.categoryTodeleteId
      ).then(() => {
        commit("DELETE_CATEGORY", state.deleteModal.categoryTodeleteId);
      });
    },
    ADD_OR_EDIT_CATEGORY({ state, dispatch, commit }) {
      let payload = (({ id, name }) => ({
        id,
        name,
      }))(state.addOrEditModal.category);
      if (state.addOrEditModal.mode === "add") {
        return CategoriesService.addCategory(payload).then((response) => {
          commit("ADD_CATEGORY", response);
          commit("EMPTY_FORM");

          dispatch(
            "display/DISPLAY_NOTIFICATION",
            {
              title: "Category ajouté !",
              subtitle: "Le Category a été ajoutée avec succes",
            },
            { root: true }
          );
        });
      }
      return CategoriesService.editCategory(payload).then((response) => {
        commit("EDIT_CATEGORY", response);
        commit("EMPTY_FORM");
        dispatch(
          "display/DISPLAY_NOTIFICATION",
          {
            title: "Category !",
            subtitle: "les informations de ce Category ont été modifiées.",
          },
          { root: true }
        );
      });
    },
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_ALL_CATEGORIES(state, categories) {
      state.all_categories = categories;
    },
    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },

    DELETE_CATEGORY(state, id) {
      const index = state.categories.findIndex(
        (category) => category.id === id
      );
      state.categories.splice(index, 1);
      state.deleteModal.show = false;
      state.deleteModal.loading = false;
    },
    ADD_CATEGORY(state, category) {
      state.categories.push(category);
      state.addOrEditModal.show = false;
    },
    EDIT_CATEGORY(state, newCategory) {
      const index = state.categories.findIndex(
        (category) => category.id === newCategory.id
      );
      state.categories.splice(index, 1, newCategory);
      state.addOrEditModal.show = false;
    },
    SET_DELETE_MODAL(state, payload) {
      if (payload.categoryId)
        state.deleteModal.categoryTodeleteId = payload.categoryId;
      state.deleteModal.show = payload.state;
    },
    SET_ADD_OR_EDIT_MODAL(state, payload) {
      state.addOrEditModal.category.name = "";

      if (payload.mode === "edit")
        state.addOrEditModal.category = Object.assign({}, payload.category);
      state.addOrEditModal.mode = payload.mode;
      state.addOrEditModal.show = payload.state;
    },
    UPDATE_NAME(state, name) {
      state.addOrEditModal.category.name = name;
    },

    EMPTY_FORM(state) {
      state.addOrEditModal.category.name = "";
    },
  },
};
