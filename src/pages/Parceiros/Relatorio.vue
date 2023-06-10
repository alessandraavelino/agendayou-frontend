<template>
  <q-page class="q-gutter-flex-start q-pa-xl">
    <div class="q-pa-md" ref="content">
      <div class="row q-pb-md">
        <div>
          <span class="col-4">Relatório de Atendimentos</span>
        </div>
      </div>
      <q-table title="Total" :rows="filteredRows" :columns="columns">
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            style="border-bottom: 1px solid #ccc"
            v-model="buscar"
            placeholder="Buscar..."
            ref="inputBusca"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn
            label="Baixar PDF"
            class="q-ml-xl"
            color="blue"
            @click="download"
            ref="downloadButton"
          />
        </template>
      </q-table>
      <div class="q-pa-md q-gutter-md row">
        <div class="text-h6">
          Clientes Atendidos:
          <q-badge outline align="middle" class="dados q-pa-sm" color="primary">
            {{ presente }}
          </q-badge>
        </div>
        <div class="text-h6">
          Clientes Ausentes:
          <q-badge outline align="middle" class="dados q-pa-sm" color="orange">
            {{ ausente }}
          </q-badge>
        </div>
        <div class="text-h6">
          Total de Lucro:
          <q-badge outline align="middle" class="dados q-pa-sm" color="green">
            R$ {{ valor }}
          </q-badge>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
const columns = [
  {
    name: "nome_cliente",
    required: true,
    align: "center",
    label: "Cliente",
    field: "nome_cliente",
    sortable: false,
  },
  {
    name: "telefone",
    align: "center",
    label: "Telefone",
    field: "telefone",
    sortable: false,
  },
  {
    name: "servico",
    align: "center",
    label: "Serviço",
    field: "tipo_servico",
    sortable: false,
  },
  {
    name: "profissional",
    align: "center",
    label: "Profissional",
    field: "profissional",
    sortable: false,
  },
  {
    name: "horario",
    align: "center",
    label: "Horário",
    field: "horario",
    sortable: false,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "status",
    sortable: false,
  },
  {
    name: "valor",
    align: "center",
    label: "Valor",
    field: "valor",
    sortable: false,
  },
];

import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import html2pdf from "html2pdf.js";

export default defineComponent({
  name: "CadastrarServicos",
  data() {
    return {
      buscar: "",
      filtro: "",
      ausente: "",
      presente: "",
      valor: "",
      isLoading: false,
      id_servico: "",
      columns,
      alert: false,
      nome: "",
      servico: "",
      profissional: "",
      time: "",
      rows: [],
      confirmDialogVisible: false,
    };
  },

  mounted() {
    this.getRelatorio();
    this.getFaturamentoTotal();
  },

  computed: {
    filteredRows() {
      // Filtra os dados com base no valor digitado no campo de busca
      const searchTerm = this.buscar.toLowerCase();
      return this.rows.filter((row) => {
        // Verifica se algum valor da linha contém o termo de busca
        return Object.values(row).some((value) => {
          return String(value).toLowerCase().includes(searchTerm);
        });
      });
    },
  },

  methods: {
    async getRelatorio() {
      this.loading = true;
      const parceiro_id = localStorage.getItem("id_parceiro");
      console.log("parceiro id", parceiro_id);
      const url = `http://127.0.0.1:5000/faturamentos/${parceiro_id}`;
      try {
        const response = await axios.get(url);
        console.log("reponse", response);
        const servicos = response.data.map((el) => ({
          id_faturamento: el.id_faturamento,
          status: el.status,
          nome_cliente: el.nome_cliente,
          telefone: el.telefone,
          tipo_servico: el.tipo_servico,
          profissional: el.profissional,
          horario: el.horario,
          valor: el.valor,
        }));

        servicos.forEach((el) => {
          if (el.status === 1) {
            el.status = "Presente";
          }
          if (el.status === 0) {
            el.status = "Ausente";
          }
        });
        this.rows = servicos;
      } catch (error) {
        console.log(error);
      }
    },
    async getFaturamentoTotal() {
      this.loading = true;
      const parceiro_id = localStorage.getItem("id_parceiro");
      console.log("parceiro id", parceiro_id);
      const url = `http://127.0.0.1:5000/faturamento/${parceiro_id}`;
      try {
        const response = await axios.get(url);
        console.log("reponse", response);
        this.ausente = response.data.ausente;
        this.presente = response.data.presente;
        this.valor = response.data.valor;
      } catch (error) {
        console.log(error);
      }
    },

    download() {
      const element = this.$refs.content;
      const button = this.$refs.downloadButton.$el;
      const input = this.$refs.inputBusca.$el;

      // Ocultar o botão de download
      button.style.display = "none";
      input.style.display = "none";

      // Adicionar a classe para ocultar no PDF

      html2pdf()
        .set({
          margin: 10,
          filename: "relatorio.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
        })
        .from(element)
        .save()
        .then(() => {
          // Restaurar a exibição do botão de download
          button.style.display = "";
          input.style.display = "";

          // Remover a classe de ocultar no PDF após a geração do PDF
        });
    },
  },
});
</script>

<style scoped>
span {
  font-size: 20px;
}

.dados {
  font-size: 20px;
  size: 50px;
}
.exclude-from-pdf {
  display: none !important;
}
</style>