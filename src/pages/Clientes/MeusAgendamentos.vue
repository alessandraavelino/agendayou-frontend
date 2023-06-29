<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <span class="col-4 text-h6">Meus Agendamentos</span>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card bg-white text-black"
        v-for="(agendamento, id_agendamento) in agendamentos"
        :key="id_agendamento"
        v-show="filtrarPorNome(parceiro)"
      >
        <q-card-section>
          <div class="text-h6">{{ agendamento.nome }}</div>
          <div class="text-subtitle2">{{ agendamento.profissional }}</div>
          <div class="text-subtitle3">{{ agendamento.horario }}</div>
          <div class="text-subtitle3">{{ agendamento.valor }}</div>
          <div class="text-subtitle3">{{ agendamento.tipo_servico }}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="flex flex-center" v-if="isLoading">
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>

  <q-dialog v-model="confirmDialogVisible" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Tem certeza que deseja excluir o parceiro?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="gray" v-close-popup />
        <q-btn
          flat
          label="Excluir"
          @click="excluirItem"
          color="negative"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { API } from '../../api/api'
export default defineComponent({
  name: "MeusAgendamentos",
  data() {
    return {
      isLoading: false,
      agendamentos: "",
      buscar: "",
      filtro: "",
      confirmDialogVisible: false,
    };
  },

  async mounted() {
    await this.getAgendamentos();
  },

  methods: {
    async getAgendamentos() {
      this.loading = true;
      const pessoa_id = localStorage.getItem("id_pessoa");
      const url = `${API}/agendamentos/pessoa/${pessoa_id}`;
      try {
        const response = await axios.get(url);
        const agendamentos = response.data.map((el) => ({
          id_agendamento: el.id_agendamento,
          nome_cliente: el.nome_cliente,
          tipo_servico: el.tipo_servico,
          telefone: el.telefone,
          profissional: el.profissional,
          horario: el.horario,
          valor: el.valor,
          pessoa_id: el.pessoa_id,
        }));

        this.agendamentos = agendamentos;
      } catch (error) {
        console.log(error);
      }
    },

    getParceirosPorNome(categoria) {
      let parceirosFiltrados = this.parceiros;

      if (this.filtro) {
        parceirosFiltrados = parceirosFiltrados.filter((servico) =>
          parceiro.nome.toLowerCase().includes(this.filtro)
        );
      }

      return parceirosFiltrados;
    },

    filtrarResultados() {
      this.filtro = this.buscar.toLowerCase();
    },

    filtrarPorNome(parceiro) {
      if (!this.buscar) {
        return true;
      }

      const nome = parceiro.nome.toLowerCase();
      const termoBusca = this.buscar.toLowerCase();

      return nome.includes(termoBusca);
    },

    deleteItem(id_parceiro) {
      // Defina o item que será excluído
      this.deleteItemId = id_parceiro;

      // Abra o diálogo de confirmação
      this.confirmDialogVisible = true;
    },

    async excluirParceiro() {
      this.isLoading = true;
      const url = `${API}/servicos/${this.deleteItemId}`;
      try {
        await axios.delete(url);

        this.$q.notify({
          message: "Serviço excluído com sucesso!",
          color: "green",
        });
        this.getServicos();
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
