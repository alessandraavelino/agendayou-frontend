<template>
  <q-page class="q-gutter-flex-start q-pa-xl">
    <div class="q-pa-md">
      <div class="row q-pb-md">
        <div>
          <span class="col-4">Cadastrar Serviços</span>
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
        title="Serviços cadastrados"
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
            <q-input v-model="fields.tipo_servico" label="Serviço" required/>
            <q-input v-model="fields.profissional" label="Profissional" required />
            <q-input v-model="fields.valor" label="Valor" type="number" required />
            <div class="row">
              <div class="q-gutter-md" style="max-width: 300px">
                <q-input
                  filled
                  required
                  v-model="fields.horario"
                  hint="Selecione a data e hora"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="fields.horario"
                          mask="DD/MM/YYYY HH:mm"
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-time
                          v-model="fields.horario"
                          mask="DD/MM/YYYY HH:mm"
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
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
            :disable="!fields.horario || !fields.profissional || !fields.valor || !fields.tipo_servico"
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
    field: "id_servico",
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
    name: "valor",
    align: "center",
    label: "Valor",
    field: "valor",
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
      fields: {
        id_servico: "",
        tipo_servico: "",
        profissional: "",
        valor: "",
        horario: null,
      },
      isLoading: false,
      id_servico: "",
      columns,
      alert: false,
      nome: "",
      servico: "",
      profissional: "",
      time: "",
      valor: "",
      rows: [],
      confirmDialogVisible: false,
    };
  },

  mounted() {
    this.getServicos();
  },

  methods: {
    async cadastrarServico() {
      const $q = useQuasar();

      const data = {
        nome_parceiro: localStorage.getItem("nome"),
        categoria: localStorage.getItem("categoria"),
        parceiro_id: localStorage.getItem("id_parceiro"),
        tipo_servico: this.fields.tipo_servico,
        profissional: this.fields.profissional,
        valor: this.fields.valor,
        horario: this.fields.horario,
      };

      if (this.fields.id_servico) {
        try {
          const response = await axios.put(
            `http://127.0.0.1:5000/servicos/${this.fields.id_servico}`,
            data
          );
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

    async getServicos() {
      this.loading = true;
      const parceiro_id = localStorage.getItem("id_parceiro");
      const url = `http://127.0.0.1:5000/servicos/${parceiro_id}`;
      try {
        const response = await axios.get(url);
        const servicos = response.data.map((el) => ({
          id_servico: el.id_servico,
          tipo_servico: el.tipo_servico,
          horario: el.horario,
          profissional: el.profissional,
          valor: el.valor,
        }));

        this.rows = servicos;
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
