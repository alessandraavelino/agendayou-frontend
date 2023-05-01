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
  import EssentialLink from "components/EssentialLink.vue";
  const listAdmin = [
    {
      title: "Dashboard",
      icon: "dashboard",
      to: "/admin/dashboard",
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
  
    methods: {
      logout() {
        localStorage.removeItem("key");
        this.$router.push("/login");
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
  