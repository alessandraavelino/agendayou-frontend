<template>
  <q-layout view="lHh Lpr lFf ">
    <q-header elevated>
      <q-toolbar class="q-tool">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Seja bem vindo (a), {{ nomeFantasia }} !</q-toolbar-title>

        <q-avatar class="rounded sair" label="Configurações">
          <q-icon name="arrow_drop_down" color="white" clickable/>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Configurações</div>
                <q-toggle v-model="mobileData" label="Use Mobile Data" />
                <q-toggle v-model="bluetooth" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="fotoPerfil" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ nomeUsuario }}
                </div>

                <q-btn
                  color="primary"
                  label="Sair"
                  push
                  @click="logout"
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="left-navigation text-white"
      show-if-above
      v-model="leftDrawerOpen"
      style="
        background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;
      "
      side="left"
      elevated
    >
      <div
        class="full-height"
        :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'"
      >
        <div style="height: calc(100% - 117px); padding: 10px">
          <q-toolbar>
            <q-avatar>
              <img src="../assets/agendayou_logo.svg" />
            </q-avatar>

            <q-toolbar-title>AgendaYOU</q-toolbar-title>
          </q-toolbar>
          <hr />
          <q-scroll-area style="height: 100%">
            <q-list>

              <EssentialLink
                tabActive
                :class="{ tabActive: isActive(to) }"
                v-for="to in essentialLinks"
                :key="to.title"
                v-bind="to"
                @click="setActive(to)"
              />
            </q-list>
          </q-scroll-area>
        </div>
      </div>
    </q-drawer>
    <q-footer elevated>
      <q-toolbar>
        <span>AgendaYOU v1.0 &copy; Copyright - Todos os direitos reservados. </span>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import axios from "axios";
import { isAdmin } from "src/auth";
import EssentialLink from "components/EssentialLink.vue";
import { API } from '../api/api'
const listParceiro = [
  {
    title: "Início",
    icon: "dashboard",
    to: "/parceiro/dashboard",
  },
  {
    title: "Novo Agendamento",
    icon: "group_add",
    to: "/agendarhorario",
  },
  {
    title: "Buscar Serviços",
    icon: "event_available",
    to: "/servicosdisponiveis",
  },
  {
    title: "Cadastrar Serviços",
    icon: "edit_calendar",
    to: "/cadastrarservico",
  },
  {
    title: "Clientes Agendados",
    icon: "group",
    to: "/clientesagendados",
  },
  {
    title: "Relatório de Atendimentos",
    icon: "list_alt",
    to: "/relatorio",
  },
  {
    title: "Cadastrar Profissionais",
    icon: "badge",
    to: "/cadastrarfuncionario",
  },
  {
    title: "Meus Agendamentos",
    icon: "watch_later",
    to: "/meusagendamentosss",
  },
  {
    title: "Atualizar Perfil",
    icon: "manage_accounts",
    to: "/atualizarperfill",
  },
  {
    title: "Suporte",
    icon: "contact_support",
    to: "/suporrte",
  },
];

export default defineComponent({
  name: "LayoutParceiro",

  components: {
    EssentialLink,
  },

  mounted() {
    this.getProfile();
  },

  methods: {
    async logout() {
      const key = localStorage.getItem("key");
      const url = `${API}/logout/${key}`;
      try {
        await axios.delete(url);
        localStorage.removeItem("key");
        localStorage.removeItem("tipo_pessoa");
        localStorage.removeItem("nome");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    getProfile() {
      this.nomeUsuario = localStorage.getItem("nome");
      this.nomeFantasia = localStorage.getItem("nome_fantasia");
    },
    isActive(to) {
      return this.activeLink === to;
    },
    setActive(to) {
      this.activeLink = to;
    }
  },
  

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: listParceiro,
      leftDrawerOpen,
      activeLink: null,
      fotoPerfil: "",
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style>
.q-drawer {
  /*background-image: url(https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg) !important;*/
  background-image: url("/statics/images/lake.jpg") !important;
  background-size: cover !important;
}

.drawer_normal {
  background-color: rgba(1, 1, 1, 0.75);
}

.drawer_dark {
  background-color: #010101f2;
}

.navigation-item {
  border-radius: 5px;
}

.tabActive {
  background-color: #472183;
  border-radius: 30px;
}


body {
  background: #f1f1f1 !important;
}

.sair {
  cursor: pointer;
}

.sair:hover {
  background-color: rgba(255, 255, 255, 0.491);
}
</style>
