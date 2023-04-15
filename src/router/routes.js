const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("pages/IndexPage.vue"),
        name: "Dashboard",
      },
      {
        path: "agendarhorario",
        component: () => import("pages/AgendarHorario.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/Cadastrar",
    name: "Cadastrar",
    component: () => import("pages/Cadastrar.vue"),
  },
  {
    path: "/Test",
    name: "Test",
    component: () => import("pages/Test.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
