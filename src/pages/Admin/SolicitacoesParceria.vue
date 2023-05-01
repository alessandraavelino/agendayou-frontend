<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <span class="col-4 text-h6">Solicitações de Parceria</span>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card bg-white text-black"
        v-for="(user, id_solicitacao) in solicitacoes"
        :key="id_solicitacao"
      >
        <q-card-section>
          <div class="text-h6">{{ user.nome }}</div>
          <div class="text-subtitle2">{{ user.cnpj }}</div>
          <div class="text-subtitle3">{{ user.email }}</div>
          <div class="text-subtitle4">{{ user.qtdFuncion }}</div>
          <div class="text-subtitle5">
            {{ user.descricao }}
          </div>
        </q-card-section>
        <q-separator white />
        <q-card-actions>
          <q-btn flat class="bg-green text-white">Aceitar</q-btn>
          <q-btn
            flat
            class="bg-red text-white"
            @click="deleteSolicitacoes(user.id_solicitacao, user.email)"
            >Recusar</q-btn
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
import axios from "axios";
export default defineComponent({
  name: "SolicitacoesParceria",
  data() {
    return {
      solicitacoes: "",
      isLoading: false,
    };
  },

  async mounted() {
    await this.getSolicitacoes();
  },

  methods: {
    async getSolicitacoes() {
      this.loading = true;
      const url = "http://127.0.0.1:5000/solicitarparceria";
      try {
        const response = await axios.get(url);
        console.log("reponse".response);
        const solicitacoes = response.data.map((el) => ({
          id_solicitacao: el.id_solicitacao,
          nome: el.nome,
          cnpj: el.cnpj,
          email: el.email,
          qtdFuncion: el.qtdFuncion,
          descricao: el.descricao,
        }));

        console.log("solicita", solicitacoes);

        this.solicitacoes = solicitacoes;
        console.log("this", this.solicitacoes);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSolicitacoes(id_solicitacao, email) {
      this.isLoading = true;
      this.solicitacoes.forEach((el) => {
        el.id_solicitacao;
      });
      console.log("id", this.solicitacoes);
      const url = `http://127.0.0.1:5000/solicitarparceria/${id_solicitacao}/${email}`;
      try {
        await axios.delete(url);

        this.$q.notify({
          message: "Parceria recusada!",
          color: "green",
        });
        this.getSolicitacoes();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
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
