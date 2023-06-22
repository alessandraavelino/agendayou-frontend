<template>
  <q-page class="q-gutter-flex-start q-pa-xl">
    <div class="q-pa-md">
      <div class="row q-pb-md">
        <div>
          <span class="col-4">Cadastrar Funcionario</span>
        </div>
        <div class="col row justify-end">
          <q-btn
            label="add"
            icon="add_circle"
            rounded
            class=".col-md-4 .offset-md-4 btnAdd"
            color="primary"
            @click="openDialog"
          />
        </div>
      </div>
      <q-table
        title="Profissionais cadastrados"
        :rows="rows"
        :columns="columns"
        row-key="id_servico"
      >
        <template v-slot:body-cell-acoes="{ row }">
          <div class="text-center q-pt-sm icons">
            <q-badge
              class="icons_delete_update"
              rounded
              color="green"
              clickable
              @click="editarItem(row)"
            >
              <q-icon name="edit" clickable size="15px"></q-icon>
            </q-badge>
            <q-badge
              class="icons_delete_update"
              rounded
              color="red"
              clickable
              @click="deleteItem(row)"
            >
              <q-icon name="delete_outline" clickable size="15px"></q-icon>
            </q-badge>
          </div>
        </template>
      </q-table>
    </div>
    <template>
      <div class="q-pa-md q-gutter-md">
        <q-badge rounded color="yellow" />
        <q-badge rounded color="green" />
        <q-badge rounded color="red" />
        <div class="q-gutter-md q-ml-none">
          <q-btn round icon="notifications">
            <q-badge floating color="red" rounded />
          </q-btn>
          <q-btn color="blue">
            Notifications
            <q-badge color="red" rounded floating />
          </q-btn>
        </div>
        <div><q-badge color="blue" rounded class="q-mr-sm" />Status</div>
      </div>
    </template>

    <q-dialog v-model="alert" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Preencha os dados abaixo:</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="width: 500px">
          <div class="q-gutter-md">
            <q-input v-model="inputNome" label="Nome" required/>
            <q-input v-model="inputCargo" label="Cargo" required />
            <q-input v-model="inputSalario" label="Salario" type="number" required />
            <div class="row">
              <div class="q-gutter-md" style="max-width: 300px">

              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Limpar" @click="cleanFields" color="clear" />
          <q-btn
            flat
            label="Salvar"
            type="button"
            @click="cadastrarServico()"
            :disable="!inputNome || !inputCargo || !inputSalario"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDialogVisible" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Tem certeza que deseja excluir o item?</div>
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
    <div class="flex flex-center" v-if="isLoading">
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
const columns = [
  {
    name: "id",
    required: true,
    align: "center",
    label: "ID",
    field: "id_profissional",
    sortable: false,
  },
  {
    name: "nome",
    align: "center",
    label: "Nome",
    field: "nome",
    sortable: false,
  },
  {
    name: "cargo",
    align: "center",
    label: "Cargo",
    field: "cargo",
    sortable: false,
  },
  {
    name: "salario",
    align: "center",
    label: "Salario",
    field: "salario",
    sortable: false,
  },
  {
    name: "acoes",
    align: "center",
    label: "Ações",
    field: "acoes",
    sortable: false,
    class: "q-table__cell-no-number",
  },
];

import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import dayjs from "dayjs";

export default defineComponent({
  name: "CadastrarServicos",
  data() {
    return {
      inputNome: "",
      inputCargo: "",
      inputSalario: "",
      isLoading: false,
      columns,
      alert: false,
      rows: [],
      confirmDialogVisible: false,
    };
  },

  mounted() {
    this.getProfissionais();
  },

  methods: {
    async cadastrarServico() {
      const $q = useQuasar();

      const data = {
        nome: this.inputNome,
        cargo: this.inputCargo,
        salario: this.inputSalario,
        parceiro_id: localStorage.getItem("id_parceiro")
      };

      if (this.fields.id_servico) {
        console.log("caiu aquiu");
        console.log("id_servic", this.fields.id_servico);
        try {
          const response = await axios.put(
            `http://127.0.0.1:5000/servicos/${this.fields.id_servico}`,
            data
          );
          console.log("response", response);
          this.getServicos();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.cleanFields();
        try {
          this.isLoading = true;

          const response = await axios.post(
            "http://127.0.0.1:5000/servicos",
            data
          );
          this.alert = false;
          this.getServicos();
        } catch (error) {
          console.log(error);
          this.$q.notify({
            message: "Ocorreu um erro! Tente novamente!",
            color: "red",
          });
          this.getServicos();
        } finally {
          this.isLoading = false;
        }
      }
    },

    async editarItem(row) {
      this.fields.id_servico = row.id_servico;
      // Preencha os campos do formulário com os dados do item a ser editado
      this.fields.tipo_servico = row.tipo_servico;
      this.fields.profissional = row.profissional;
      this.fields.valor = row.valor;
      this.fields.horario = row.horario;

      // Abra o q-dialog de alerta
      this.alert = true;
    },

    cleanFields() {
      this.fields.id_servico = "";
      this.fields.tipo_servico = "";
      this.fields.profissional = "";
      this.fields.valor = "";
      this.fields.horario = "";
      this.alert = true;
    },

    openDialog() {
      this.cleanFields();
      this.alert = true;
    },

    deleteItem(row) {
      // Defina o item que será excluído
      this.deleteItemId = row.id_servico;

      // Abra o diálogo de confirmação
      this.confirmDialogVisible = true;
    },

    async getProfissionais() {
      this.loading = true;
      const parceiro_id = localStorage.getItem("id_parceiro");
      console.log("parceiro id", parceiro_id);
      const url = `http://127.0.0.1:5000/profissional/${parceiro_id}`;
      try {
        const response = await axios.get(url);
        console.log("reponse", response);
        const profissionais = response.data.map((el) => ({
          id_profissional: el.id_profisional,
          nome: el.nome,
          cargo: el.cargo,
          salario: el.salario,
        }));

        console.log("servic", servicos);

        this.rows = profissionais;
      } catch (error) {
        console.log(error);
      }
    },
    async excluirItem() {
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
.icons_delete_update {
  cursor: pointer;
}

.icons_delete_update:hover {
  color: rgb(79, 79, 79);
}
</style>
