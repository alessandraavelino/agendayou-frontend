<template>
    <q-page class="q-pa-md">
      <div class="q-pa-md row items-start q-gutter-md">
        <span class="col-4 text-h6">Clientes Agendados</span>
      </div>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card
          class="my-card bg-white text-black"
          v-for="(user, id_agendamento) in agendamentos"
          :key="id_agendamento"
        >
          <q-card-section>
            <div class="text-h6">{{ user.nome_cliente }}</div>
            <div class="text-subtitle2">{{ user.telefone }}</div>
            <div class="text-subtitle2">{{ user.tipo_servico }}</div>
            <div class="text-subtitle3">{{ user.profissional }}</div>
            <div class="text-subtitle4">{{ user.horario }}</div>
            <div class="text-subtitle4">{{ user.valor }}</div>
            <div class="text-subtitle5">
              {{ user.descricao }}
            </div>
          </q-card-section>
          <q-separator white />
          <q-card-actions>
            <q-btn
              flat
              class="bg-green text-white"
              @click="openModalAceitar(user)"
              >Presente</q-btn
            >
            <q-btn
              flat
              class="bg-orange text-white"
              @click="deleteSolicitacoes(user.id_solicitacao, user.email)"
              >Ausente</q-btn
            >
          </q-card-actions>
        </q-card>
      </div>
      <div class="flex flex-center" v-if="isLoading">
        <q-spinner color="primary" size="3em" />
      </div>
    </q-page>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import { useQuasar } from "quasar";
  import axios from "axios";
  export default defineComponent({
    name: "ClientesAgendados",
    data() {
      return {
        agendamentos: "",
        isLoading: false,
      };
    },
  
    async mounted() {
      await this.getAgendamentos();
    },
  
    methods: {
      async getAgendamentos() {
        this.loading = true;
        const parceiro_id = localStorage.getItem("id_parceiro")
        const url = `http://127.0.0.1:5000/agendamentos/${parceiro_id}`;
        try {
          const response = await axios.get(url);
          console.log("reponse", response);
          const agendamentos = response.data.map((el) => ({
            id_solicitacao: el.id_solicitacao,
            nome_cliente: el.nome_cliente,
            telefone: el.tipo_servico,
            profissional: el.profissional,
            horario: el.horario,
            valor: el.valor
          }));
  
          console.log("solicita", agendamentos);
  
          this.agendamentos = agendamentos;
          console.log("this", this.agendamentos);
        } catch (error) {
          console.log(error);
        }
      },
  
    },
  });
  </script>
  
  <style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 350px
  </style>
  