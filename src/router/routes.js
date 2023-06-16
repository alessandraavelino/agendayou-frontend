const routes = [
  {
    path: "/",
    component: () => import("src/layouts/LayoutCliente.vue"),
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
        name: "Admin",
      },
      {
        path: "solicitacoes",
        component: () => import("pages/Admin/SolicitacoesParceria.vue"),
      },
      {
        path: "atualizarperfil",
        component: () => import("pages/Admin/AtualizarPerfil.vue"),
      },
      {
        path: "/servicosdisponiveiss",
        name: "Servicos Disponiveis",
        component: () => import("pages/ServicosDisponiveis.vue"),
      },
    ],
    meta: { requiresAuth: true, allowedUserTypes: ["admin"] },
  },
  {
    path: "/parceiro/",
    component: () => import("layouts/LayoutParceiro.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("pages/Parceiros/Index.vue"),
        name: "Parceiro",
      },
      {
        path: "/servicosdisponiveis",
        name: "ServicosDisponiveis",
        component: () => import("pages/ServicosDisponiveis.vue"),
      },
      {
        path: "/cadastrarservico",
        name: "CadastrarServico",
        component: () => import("pages/Parceiros/CadastrarServicos.vue"),
      },
      {
        path: "/agendamentos",
        name: "Agendamentos",
        component: () => import("pages/Parceiros/Agendamentos.vue"),
      },
      {
        path: "/clientesagendados",
        name: "ClientesAgendados",
        component: () => import("pages/Parceiros/ClientesAgendados.vue"),
      },
      {
        path: "/relatorio",
        name: "Relatorio",
        component: () => import("pages/Parceiros/Relatorio.vue"),
      }
    ],
    meta: { requiresAuth: true, allowedUserTypes: ["parceiro"] },
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
