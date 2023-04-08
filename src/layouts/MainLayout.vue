<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Agenday </q-toolbar-title>

        <div>
          <q-icon name="logout" @click="logout" />
          <span>Alessandra</span>

          <q-avatar class="q-pl-sm">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <q-item-label header> Menu </q-item-label>

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
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Dashboard",
    icon: "dashboard",
    to: "/dashboard",
  },
  {
    title: "Agendar Horário",
    icon: "watch_later",
    to: "agendarhorario",
  },
  {
    title: "Clientes Agendados",
    icon: "people",
    to: "",
  },
  {
    title: "Faturamento",
    icon: "paid",
    to: "",
  },
  {
    title: "Atualizar Dados",
    icon: "manage_accounts",
    to: "",
  },
  {
    title: "Colaboradores",
    icon: "badge",
    to: "",
  },
  {
    title: "Envio de Mensagens",
    icon: "message",
    to: "",
  },
  {
    title: "Suporte",
    icon: "help",
    to: "",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  methods: {
    logout() {
      localStorage.removeItem("key");
      this.$router.push("/login");
    },
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
