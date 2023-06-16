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

        <q-toolbar-title> Seja bem vindo (a), {{ nomeUsuario }} !</q-toolbar-title>

        <q-avatar color="blue" class="rounded" label="Configurações">
          <img class="rounded" src="https://cdn.quasar.dev/img/avatar4.jpg" />
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
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
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

    <q-drawer class="menu" v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="to in essentialLinks"
          :key="to.title"
          v-bind="to"
        />
      </q-list>
    </q-drawer>
    <q-footer elevated>
      <q-toolbar>
        <span
          >AgendaYOU v1.0 &copy; Copyright - Todos os direitos reservados.
        </span>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { isAdmin } from "src/auth";
const linksList = [
  {
    title: "Dashboard",
    icon: "dashboard",
    to: "/dashboard",
  },
  {
    title: "Buscar Serviços",
    icon: "event_available",
    to: "/servicosdisponiveisss",
  },
  {
    title: "Meus Agendamentos",
    icon: "watch_later",
    to: "/meusagendamentos",
  },
  {
    title: "Atualizar Perfil",
    icon: "manage_accounts",
    to: "atualizarperfil",
  },
  {
    title: "Suporte",
    icon: "help",
    to: "",
  },
];

export default defineComponent({
  name: "LayoutCliente",

  components: {
    EssentialLink,
  },

  mounted() {
    this.getProfile();
  },

  methods: {
    async logout() {
      const key = localStorage.getItem("key");
      const url = `http://127.0.0.1:5000/logout/${key}`;
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
      console.log("nome", this.nomeUsuario);
    }
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
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
</style>
