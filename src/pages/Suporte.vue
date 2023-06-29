<template>
  <q-page class="q-gutter-flex-start q-pa-xl">
    <div class="q-pa-md">
      <div class="row q-pb-md">
        <div class="col">
          <span class="col-4">Solicitar Suporte</span>
        </div>
      </div>
      <div class="q-pa-md row justify-center">
        <div class="q-pa-md q-gutter-sm" style="width: 50rem">
          <q-input outlined v-model="emailAY" disable></q-input>
          <q-editor v-model="editor" placeholder="Descreva detalhadamente o seu problema e faremos o possível para corrigir o mais rápido! " min-height="20rem" />
        </div>
      </div>
    </div>
    <div class="text-center">
      <q-btn
        label="enviar"
        rounded
        color="primary"
        @click="solicitarSuporte()"
        :disable="
          editor === ''
        "
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { API } from '../api/api'

export default defineComponent({
  name: "Suporte",
  data() {
    return {
      confirmDialogVisible: false,
      inputNome: "",
      inputTelefone: "",
      inputServico: "",
      inputProfissional: "",
      inputHorario: "",
      inputValor: "",
      editor: '',
      emailAY: "agendayouoficial@gmail.com"
    };
  },

  mounted() {},

  methods: {
    async solicitarSuporte(servico) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          `${API}/suporte`,
          {
            descricao: this.editor,
            pessoa_id: localStorage.getItem("id_pessoa")
          }
        );
        this.$q.notify({
          message: "Solicitação enviada!",
          color: "green",
        });
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: "Ocorreu um erro! Tente novamente!",
          color: "red",
        });
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<style scoped>
span {
  font-size: 20px;
}
.btnAdd {
  font-weight: 900;
}

.custom-date-picker {
  width: 95%;
}
</style>
