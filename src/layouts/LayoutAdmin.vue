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

        <q-toolbar-title>Painel do Administrador</q-toolbar-title>

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
              <img src="../assets/logo-menu-agenda.svg" />
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
import { isAdmin } from "src/auth";
import EssentialLink from "components/EssentialLink.vue";
const listAdmin = [
  {
    title: "Dashboard",
    icon: "dashboard",
    to: "/admin/dashboard",
  },
  {
    title: "Buscar Serviços",
    icon: "event_available",
    to: "/servicosdisponiveiss",
  },
  {
    title: "Solicitações de Parceria",
    icon: "add_task",
    to: "/admin/solicitacoes",
  },
  {
    title: "Atualizar Perfil",
    icon: "manage_accounts",
    to: "/atualizarperfil",
  },
  {
    title: "Parceiros",
    icon: "handshake",
    to: "/admin/parceiros",
  },
  {
    title: "Meus Agendamentos",
    icon: "watch_later",
    to: "/meusagendamentoss",
  },
  {
    title: "Solicitações de Suporte",
    icon: "contact_support",
    to: "/solicitacoessuporte",
  },
];

export default defineComponent({
  name: "LayoutAdmin",

  components: {
    EssentialLink,
  },

  mounted() {
    this.getProfile();
  },

  methods: {
    logout() {
      localStorage.removeItem("tipo_pessoa");
      localStorage.removeItem("key");
      localStorage.removeItem("nome");
      localStorage.removeItem("foto");
      this.$router.push("/login");
    },
    getProfile() {
      this.nomeUsuario = localStorage.getItem("nome");
      this.fotoPerfil = localStorage.getItem("foto");
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
      essentialLinks: listAdmin,
      activeLink: null,
      fotoPerfil: "",
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style>
body {
  background-color: rgba(249, 249, 249, 0.801);
}
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
