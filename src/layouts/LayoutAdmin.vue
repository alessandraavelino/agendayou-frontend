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

        <q-toolbar-title> AgendaYOU - Admin </q-toolbar-title>

        <div>
          <q-icon name="logout" @click="logout" />
          <span>{{ nomeUsuario }}</span>

          <q-avatar class="q-pl-sm">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
        </div>
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
    title: "Meus Agendamentos",
    icon: "schedule_send",
    to: "",
  },
  {
    title: "Solicitações de Parceria",
    icon: "add_task",
    to: "/admin/solicitacoes",
  },
  {
    title: "Atualizar Perfil",
    icon: "person",
    to: "/solicitacoes",
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
      this.$router.push("/login");
    },
    getProfile() {
      this.nomeUsuario = localStorage.getItem("nome");
      console.log("nome", this.nomeUsuario)
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: listAdmin,
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
