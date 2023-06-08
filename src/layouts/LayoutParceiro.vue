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

        <q-toolbar-title> AgendaYOU - Parceiro </q-toolbar-title>

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
        <q-item-label header>
          <q-row>
            <q-col cols="6" class="flex items-center justify-center" >
              <img src="../assets/logo-agenda.svg" style="width: 50px" />
            </q-col>
            <q-col cols="6" class="flex items-center justify-center">
              <label>AgendaYOU</label>
            </q-col>
          </q-row>
        </q-item-label>
        <hr style="max-width: 90%" />

        <EssentialLink
          v-for="to in essentialLinks"
          :key="to.title"
          v-bind="to"
        />
      </q-list>
    </q-drawer>

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
const listParceiro = [
  {
    title: "Dashboard",
    icon: "dashboard",
    to: "/parceiro/dashboard",
  },
  {
    title: "Novo Agendamento",
    icon: "group_add",
    to: "",
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
    icon: "group",
    to: "/relatorio",
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
      const key = localStorage.getItem("key")
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
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: listParceiro,
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
