<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="flex items-center px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Products</h1>
      <span class="inline-flex rounded-md shadow-sm">
        <button
          @click="setAddOrEditModalState({ state: true, mode: 'add' })"
          type="button"
          class="inline-flex items-center px-4 py-2 ml-6 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
        >
          <svg
            class="-ml-1 mr-2 h-5 w-5"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"
            />
          </svg>
          New Product
        </button>
      </span>
    </div>
    <div class="mt-4">
      <div class="flex flex-col">
        <div class="py-2 overflow-x-auto sm:px-6 lg:px-8">
          <div
            class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
          >
            <table class="min-w-full">
              <thead>
                <tr
                  class="cursor-pointer bg-indigo-600 rounded-l-lg text-white hover:bg-indigo-700"
                >
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    Nom
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    class="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-100 uppercase tracking-wider"
                  >
                    Date creation
                  </th>
                  <th class="px-6 py-3 border-b border-gray-200"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(p, index) in products"
                  :key="index"
                  class="bg-white"
                >
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ p.name }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ p.description }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ p.price }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ p.category.name }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-800"
                  >
                    {{ p.created_at }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                  >
                    <button
                      @click="
                        setAddOrEditModalState({
                          state: true,
                          mode: 'edit',
                          product: p,
                        })
                      "
                      class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    >
                      Editer
                    </button>
                    <button
                      class="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                      @click="
                        setDeleteModalState({
                          state: true,
                          productId: p.id,
                        })
                      "
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- BEGIN navigation -->
          <app-pagination
            :pagination="pagination"
            @select-page="(page) => getProducts({ page })"
            @next="getProducts({ page: ++pagination.current_page })"
            @prev="getProducts({ page: --pagination.current_page })"
          ></app-pagination>
          <!-- END navigation -->
        </div>
      </div>
    </div>
    <!-- BEGIN modal -->
    <app-modal
      v-show="isDeleteModalActive"
      :is-shown="isDeleteModalActive"
      title="Supprimer ce Produit"
      subtitle="Êtes-vous sûr de vouloir supprimer ce Produit? Toutes les données concernant ce Produit seront supprimées définitivement. Cette action ne peut pas être annulée."
      :loading="deleteModalLoading"
      @confirm="deleteProduct()"
      @cancel="setDeleteModalState({ state: false })"
    ></app-modal>
    <!-- END modal -->
    <!-- BEGIN slide over -->
    <app-slide-over
      title="Ajouter un Produit"
      subtitle="Remplir le formulaire afin d'ajouter un nouveau Produit"
      v-show="isAddOrEditModalActive"
      :is-shown="isAddOrEditModalActive"
      @cancel="setAddOrEditModalState({ state: false })"
      @confirm="addOreditProduct"
    >
      <form action>
        <div>
          <label
            for="name"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Nom
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="name"
              class="form-input block w-full sm:text-sm sm:leading-5 px-3 py-2 border-gray-400 border rounded"
              placeholder="devinweb"
              type="text"
              v-model="name"
            />
          </div>
        </div>
        <div class="mt-4">
          <label
            for="description"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Description</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="description"
              class="form-input block w-full sm:text-sm sm:leading-5 px-3 py-2 border-gray-400 border rounded"
              placeholder="http://www.exemple.com"
              type="text"
              v-model="description"
            />
          </div>
        </div>
        <div class="mt-4">
          <label
            for="price"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Price</label
          >
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              id="price"
              class="form-input block w-full sm:text-sm sm:leading-5 px-3 py-2 border-gray-400 border rounded"
              placeholder="ali@gmail.com"
              type="number"
              v-model="price"
            />
          </div>
        </div>
        <div class="mt-4">
          <label
            for="city"
            class="block text-sm font-medium leading-5 text-gray-700"
            >Entreprise</label
          >
          <span
            class="mt-1 relative z-0 inline-flex shadow-sm rounded-md w-full"
          >
            <select
              v-model="category_id"
              id="cityId"
              class="-ml-px block form-select w-full pl-3 pr-9 py-2 rounded-l-none rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              aria-label="Select message type"
            >
              <option v-if="mode != 'edit'"></option>
              <option
                v-for="(c, index) in allCategories"
                :key="index"
                :value="c.id"
              >
                {{ c.name }}
              </option>
            </select>
          </span>
        </div>
      </form>
    </app-slide-over>
    <!-- END slide over -->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import AppPagination from "@/components/app/pagination/AppPagination.vue";
import AppModal from "@/components/app/modals/AppModal.vue";
import AppSlideOver from "@/components/app/slideovers/AppSlideOver.vue";

export default {
  name: "ProductsList",

  mounted() {
    this.getProducts({
      page: 1,
    });
    this.getAllCategories();
  },
  methods: {
    ...mapActions("products", {
      getProducts: "GET_PRODUCTS",
      deleteProduct: "DELETE_PRODUCT",
      getAllCategories: "GET_ALL_CATEGORIES",
      addOreditProduct: "ADD_OR_EDIT_PRODUCT",
    }),
    ...mapMutations("products", {
      setDeleteModalState: "SET_DELETE_MODAL",
      setAddOrEditModalState: "SET_ADD_OR_EDIT_MODAL",
      closeNotification: "SET_NOTIFICATION",
      updateName: "UPDATE_NAME",
      updateDescription: "UPDATE_DESCRIPTION",
      updatePrice: "UPDATE_PRICE",
      updateCategoryId: "UPDATE_CATEGORY_ID",
    }),
    display(object) {
      if (object.length > 0) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    ...mapState("products", {
      products: (state) => state.products,
      pagination: (state) => state.pagination,
      allCategories: (state) => state.allCategories,
      isDeleteModalActive: (state) => state.deleteModal.show,
      deleteModalLoading: (state) => state.deleteModal.loading,
      isAddOrEditModalActive: (state) => state.addOrEditModal.show,
    }),
    mode: {
      get() {
        return this.$store.state.products.addOrEditModal.mode;
      },
    },
    name: {
      get() {
        return this.$store.state.products.addOrEditModal.product.name;
      },
      set(value) {
        this.updateName(value);
      },
    },
    description: {
      get() {
        return this.$store.state.products.addOrEditModal.product.description;
      },
      set(value) {
        this.updateDescription(value);
      },
    },
    price: {
      get() {
        return this.$store.state.products.addOrEditModal.product.price;
      },
      set(value) {
        this.updatePrice(value);
      },
    },
    category_id: {
      get() {
        return this.$store.state.products.addOrEditModal.product.category_id;
      },
      set(value) {
        this.updateCategoryId(value);
      },
    },
  },
  components: {
    AppPagination,
    AppModal,
    AppSlideOver,
  },
};
</script>

<style></style>
