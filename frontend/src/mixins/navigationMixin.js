import { mapGetters, mapActions } from "vuex";

var navigationMixin = {
  data() {
    return {
      activeClass: "text-gray-900",
    };
  },
  computed: {
    ...mapGetters("auth", {
      isAdmin: "isAdmin",
      Role: "Role",
    }),
    currentRoute() {
      return this.$route.name;
    },
    menu() {
      return [
        {
          name: "Dashboard",
          route: "dashboard",
          icon: "home",
          show: this.isAdmin,
          hasBadge: false,
        },
        {
          name: "Products",
          route: "products-list",
          icon: "",
          show: this.isAdmin,
          hasBadge: false,
        },
        {
          name: "Categories",
          route: "categories-list",
          icon: "",
          show: this.isAdmin,
          hasBadge: false,
        },
      ];
    },
    filteredMenu() {
      return this.menu.filter((item) => item.show);
    },
  },
  methods: {
    ...mapActions("display", {
      getMenu: "GET_MENU",
    }),
  },
};

export default navigationMixin;
