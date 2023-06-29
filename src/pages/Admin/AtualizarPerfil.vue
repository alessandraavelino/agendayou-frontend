<template>
  <div class="q-pa-md">
    <div class="q-col-gutter row items-start">
      <div class="col-4">
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          class="full-width"
        >
          <div class="absolute-bottom text-subtitle1 text-center">Caption</div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { API } from '../api/api'
export default defineComponent({
  name: "AtualizarPerfil",
  data() {
    return {
      solicitacoes: "",
      isLoading: false,
      confirmarExclusao: false,
    };
  },

  async mounted() {
    await this.getSolicitacoes();
  },

  methods: {
    async getSolicitacoes() {
      this.loading = true;
      const url = `${API}/solicitarparceria`;
      try {
        const response = await axios.get(url);
        const solicitacoes = response.data.map((el) => ({
          id_solicitacao: el.id_solicitacao,
          nome: el.nome,
          cnpj: el.cnpj,
          email: el.email,
          qtdFuncion: el.qtdFuncion,
          descricao: el.descricao,
        }));

        this.solicitacoes = solicitacoes;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSolicitacoes(id_solicitacao, email) {
      this.isLoading = true;
      const url = `${API}/solicitarparceria/${id_solicitacao}/${email}`;
      try {
        await axios.delete(url);
        this.solicitacoes = this.solicitacoes.filter(
          (el) => el.id_solicitacao !== id_solicitacao
        );

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
    onShowModal() {
      deleteSolicitacoes(user.id_solicitacao, user.email);
    },
  },
});
</script>

<style>
.full-width {
  width: 100%;
}
</style>
