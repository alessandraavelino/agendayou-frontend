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
    meta: { requiresAuth: true, allowedUserTypes: ["cliente"] },
  },
  {
    path: "/admin/",
    component: () => import("layouts/LayoutAdmin.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("pages/Admin/Index.vue"),
        name: "Dashboard",
      },
      {
        path: "solicitacoes",
        component: () => import("pages/Admin/SolicitacoesParceria.vue"),
      },
    ],
    meta: { requiresAuth: true, allowedUserTypes: ["admin"] },
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
