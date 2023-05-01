import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { checkAuth, isAdmin } from "src/auth";

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    console.log("requires auth", requiresAuth);

    const allowedUserTypes = to.matched.reduce((types, record) => {
      if (record.meta.allowedUserTypes) {
        types.push(...record.meta.allowedUserTypes);
      }
      return types;
    }, []);
    console.log("allowed user types", allowedUserTypes);

    const userType = isAdmin(); // função que retorna o tipo de usuário logado
    console.log("user type", userType);

    if (requiresAuth && !checkAuth()) {
      next("/Login");
    } else if (
      allowedUserTypes.length > 0 &&
      !allowedUserTypes.includes(userType)
    ) {
      console.log("user not allowed");
      next({ name: "Admin" });
    } else {
      console.log("user allowed");
      next();
    }
  });

  return Router;
});
