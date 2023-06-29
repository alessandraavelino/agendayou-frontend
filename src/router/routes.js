const routes = [
  {
    path: "/",
    component: () => import("src/layouts/LayoutCliente.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("pages/IndexPage.vue"),
        name: "Dashboard",
      },
      {
        path: "servicosdisponiveisss",
        name: "ServicosDisponiveis",
        component: () => import("pages/ServicosDisponiveis.vue"),
      },
      {
        path: "meusagendamentos",
        name: "MeusAgendamentos",
        component: () => import("pages/Clientes/MeusAgendamentos.vue"),
      },
      {
        path: "atualizarperfilll",
        name: "AtualizarRPerfil",
        component: () => import("pages/AtualizarPerfil.vue"),
      },
      {
        path: "/suporte",
        name: "ClienteSuporte",
        component: () => import("pages/Suporte.vue"),
      }
    
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
        path: "parceiros",
        component: () => import("pages/Admin/Parceiros.vue"),
        name: "Parceiros",
      },
      {
        path: "solicitacoes",
        component: () => import("pages/Admin/SolicitacoesParceria.vue"),
      },
      {
        path: "/servicosdisponiveiss",
        name: "ServicosDisponiveisAdmin",
        component: () => import("pages/ServicosDisponiveis.vue"),
      },
      {
        path: "/meusagendamentoss",
        name: "MeusAgendamentsos",
        component: () => import("pages/Clientes/MeusAgendamentos.vue"),
      },
      {
        path: "/atualizarperfil",
        name: "AtualizaraPerfilAdmin",
        component: () => import("pages/AtualizarPerfil.vue"),
      },
      {
        path: "/solicitacoessuporte",
        name: "SolicitacoesSuporte",
        component: () => import("pages/Admin/SolicitacoesSuporte.vue"),
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
        name: "ServicosDisponiveisParceiro",
        component: () => import("pages/ServicosDisponiveis.vue"),
      },
      {
        path: "/cadastrarfuncionario",
        name: "FuncionariosCadastrados",
        component: () => import("pages/Parceiros/CadastrarFuncionario.vue"),
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
      },
      {
        path: "/meusagendamentosss",
        name: "MeusAggendamentsos",
        component: () => import("pages/Clientes/MeusAgendamentos.vue"),
      },
      {
        path: "/atualizarperfill",
        name: "AtualizarPerfil",
        component: () => import("pages/AtualizarPerfil.vue"),
      },
      {
        path: "/agendarhorario",
        name: "AgendarHorario",
        component: () => import("pages/Parceiros/AgendarHorario.vue"),
      },
      {
        path: "/suporrte",
        name: "Suporte",
        component: () => import("pages/Suporte.vue"),
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
