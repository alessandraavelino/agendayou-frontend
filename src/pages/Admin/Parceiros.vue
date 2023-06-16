<template>
  <q-page class="q-pa-md">
    <div class="flex flex-center">
        <q-input
        v-model="buscar"
        label="Busque por um parceiro específico"
        @input="filtrarResultados"
        style="width: 500px"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <span class="col-4 text-h6">Lista de Parceiros</span>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card bg-white text-black"
        v-for="(parceiro, id_parceiro) in parceiros"
        :key="id_parceiro"
        v-show="filtrarPorNome(parceiro)"
      >
        <q-card-section>
          <div class="text-h6">{{ parceiro.nome }}</div>
          <div class="text-subtitle2">{{ parceiro.nome_fantasia }}</div>
          <div class="text-subtitle3">{{ parceiro.cnpj }}</div>
          <div class="text-subtitle3">{{ parceiro.email }}</div>
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
export default defineComponent({
  name: "Parceiros",
  data() {
    return {
      isLoading: false,
      parceiros: "",
      buscar: "",
      filtro: "",
      confirmDialogVisible: false,
    };
  },

  async mounted() {
    await this.getParceiros();
  },

  methods: {
    async getParceiros() {
      this.loading = true;
      const url = "http://127.0.0.1:5000/parceiros";
      try {
        const response = await axios.get(url);
        console.log("reponse".response);
        const parceiros = response.data.map((el) => ({
          id_parceiro: el.id_parceiro,
          nome: el.nome,
          cnpj: el.cnpj,
          nome_fantasia: el.nome_fantasia,
          email: el.email,
          categoria: el.categoria
        }));

        console.log("parceirosAqui: ", parceiros);

        this.parceiros = parceiros;
        console.log("this", this.parceiros);
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
      const url = `http://127.0.0.1:5000/servicos/${this.deleteItemId}`;
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
    }
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
