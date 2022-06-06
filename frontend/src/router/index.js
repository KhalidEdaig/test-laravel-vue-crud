import Home from "@/Home.vue";
import Login from "@/Login.vue";
import CategoriesPage from "@/views/categories";
import CategoriesListPage from "@/views/categories/list";
import DashboardPage from "@/views/Dashboard";
import ProductsPAge from "@/views/products";
import ProductsListPage from "@/views/products/list";
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  // mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      name: "home",
      path: "/",
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          name: "dashboard",
          path: "dashboard",
          component: DashboardPage,
        },

        {
          name: "categories",
          path: "categories",
          component: CategoriesPage,
          children: [
            {
              name: "categories-list",
              path: "list",
              component: CategoriesListPage,
            },
          ],
        },
        {
          name: "products",
          path: "products",
          component: ProductsPAge,
          children: [
            {
              name: "products-list",
              path: "list",
              component: ProductsListPage,
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (to.path === "/") {
    if (user) {
      router.push({ name: "dashboard" });
    } else {
      return next({ name: "login" });
    }
  }

  if (to.name === "login") {
    if (user) {
      return next({ name: "dashboard" });
    } else {
      return next();
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
      return next({ name: "login" });
    } else {
      return next();
    }
  } else {
    return next();
  }
});

export default router;
