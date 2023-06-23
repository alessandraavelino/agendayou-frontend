<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <span class="col-4 text-h6">Solicitações de Suporte</span>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card bg-white text-black"
        v-for="(suporte, id_suporte) in suporte"
        :key="id_suporte"
      >
        <q-card-section>
          <div class="text-h6">{{ suporte.descricao }}</div>
        </q-card-section>
        <q-card-section>
          <q-btn
            label="resolvido"
            color="green"
            @click="deleteItem(suporte)"
          />
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
        <div class="text-h6">Tem certeza que o problema foi resolvido?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="gray" v-close-popup />
        <q-btn
          flat
          label="sim"
          @click="excluirSuporte(id)"
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
  name: "SolicitacaoesSuporte",
  data() {
    return {
      isLoading: false,
      suporte: "",
      confirmDialogVisible: false,
    };
  },

  async mounted() {
    await this.getSuporte();
  },

  methods: {
    async getSuporte() {
      this.loading = true;
      const url = `http://127.0.0.1:5000/suporte`;
      try {
        const response = await axios.get(url);
        const suporte = response.data.map((el) => ({
          id_suporte: el.id_suporte,
          descricao: el.descricao,
        }));

        this.suporte = suporte;
      } catch (error) {
        console.log(error);
      }
    },

    deleteItem(suporte) {
      // Defina o item que será excluído
      this.deleteItemId = suporte.id_suporte;

      // Abra o diálogo de confirmação
      this.confirmDialogVisible = true;
    },

    async excluirSuporte() {
      this.isLoading = true;
      const url = `http://127.0.0.1:5000/suporte/${this.deleteItemId}`;
      try {
        await axios.delete(url);

        this.$q.notify({
          message: "Problema resolvido com sucesso!",
          color: "green",
        });
        this.getSuporte();
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
