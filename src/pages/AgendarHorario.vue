<template>
  <q-page class="q-gutter-flex-start q-pa-xl">
    <div class="q-pa-md">
      <div class="row q-pb-md">
        <div>
          <span class="col-4">Agendar Horário</span>
        </div>
        <div class="col row justify-end">
          <q-btn
            label="add"
            icon="add_circle"
            rounded
            class=".col-md-4 .offset-md-4 btnAdd"
            color="primary"
            @click="alert = true"
          />
        </div>
      </div>
      <q-table
        title="Clientes"
        :rows="rows"
        :columns="columns"
        row-key="id"
        :data="clientes"
      >
      </q-table>
    </div>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Preencha os dados abaixo:</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="width: 500px">
          <div class="q-gutter-md">
            <q-input v-model="nome" label="Nome e Sobrenome" />
            <q-input v-model="servico" label="Serviço" />
            <q-input v-model="profissional" label="Profissional" />
            <div class="row">
              <q-input
                v-model="date"
                filled
                class=".col-4 q-pr-xl"
                type="date"
                hint="Selecione uma data"
              />
              <q-input
                v-model="time"
                filled
                class=".col"
                type="time"
                hint="Selecione um horário"
              />
            </div>
            <q-input v-model="valor" label="Valor" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Limpar" color="clear" v-close-popup />
          <q-btn
            flat
            label="Salvar"
            type="button"
            @click="save()"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
    field: (row) => row.id,
    sortable: true,
  },
  {
    name: "nome",
    align: "center",
    label: "Nome",
    field: "nome",
    sortable: true,
  },
  {
    name: "servico",
    align: "center",
    label: "Serviço",
    field: "servico",
    sortable: true,
  },
  {
    name: "profissional",
    align: "center",
    label: "Profissional",
    field: "profissional",
    sortable: true,
  },
  {
    name: "horario",
    align: "center",
    label: "Horário",
    field: "horario",
    sortable: true,
  },
  {
    name: "valor",
    align: "center",
    label: "Valor",
    field: "valor",
    sortable: true,
  },
  {
    name: "valor",
    align: "center",
    label: "Ações",
    field: "valor",
    sortable: true,
  },
];

const rows = [];
import { ref } from "vue";
export default defineComponent({
  name: "AgendarHorario",
  data() {
    return {
      columns,
      rows,
      alert: ref(false),
      nome: "",
      servico: "",
      profissional: "",
      date: ref("2019/02/01"),
      time: "",
      valor: "",
      clientes: [],
      id: 0,
    };
  },

  mounted() {},

  methods: {
    save() {
      this.id++;
      this.rows.push({
        id: this.id,
        nome: this.nome,
        servico: this.servico,
        profissional: this.profissional,
        data: this.date,
        hora: this.time,
        valor: this.valor,
      });
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
</style>
