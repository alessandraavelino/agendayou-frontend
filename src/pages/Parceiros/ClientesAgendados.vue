<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <span class="col-4 text-h6">Clientes Agendados</span>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card bg-white text-black"
        v-for="(user, id_agendamento) in agendamentos"
        :key="id_agendamento"
      >
        <q-card-section class="q-pa-md">
          <div class="text-h6">
            <q-icon class="icon" name="person" />{{ user.nome_cliente }}
          </div>
          <div class="text-subtitle">
            <q-icon class="icon" name="call" /> {{ user.telefone }}
          </div>
          <div class="text-subtitle">
            <q-icon class="icon" name="description" /> {{ user.tipo_servico }}
          </div>

          <div class="text-subtitle">
            <q-icon class="icon" name="badge" /> {{ user.profissional }}
          </div>
          <div class="text-subtitle">
            <q-icon class="icon" name="today" /> {{ user.horario }}
          </div>
          <div class="text-subtitle">
            <q-icon class="icon" name="paid" /> {{ user.valor }}
          </div>
          <div class="text-subtitle">
            {{ user.descricao }}
          </div>
        </q-card-section>
        <q-separator white />
        <q-card-actions>
          <q-btn
            flat
            class="bg-green text-white"
            @click="openModalConfirmar(user)"
            >Atendido</q-btn
          >
          <q-btn
            flat
            class="bg-orange text-white"
            @click="openModalConfirmarAusente(user)"
            >Ausente</q-btn
          >
        </q-card-actions>
      </q-card>
      <q-dialog v-model="formularioConfirmacaoAusente" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirma que o usuário não compareceu?</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="gray" v-close-popup />
            <q-btn
              flat
              label="Sim"
              @click="recusado"
              color="negative"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="formularioConfirmacao" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirma que o usuário compareceu?</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="gray" v-close-popup />
            <q-btn
              flat
              label="Sim"
              @click="atendido"
              color="negative"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="flex flex-center" v-if="isLoading">
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
export default defineComponent({
  name: "ClientesAgendados",
  data() {
    return {
      formularioConfirmacaoAusente: false,
      formularioConfirmacao: false,
      agendamentos: "",
      isLoading: false,
      confirmDialogVisibleAtend: false,
      confirmDialogVisible: false,
      nome_cliente: "",
      telefone: "",
      tipo_servico: "",
      profissional: "",
      horario: "",
      valor: "",
      parceiro_id: "",
      pessoa_id: ""

    };
  },

  async mounted() {
    await this.getAgendamentos();
  },

  methods: {
    async getAgendamentos() {
      this.loading = true;
      const parceiro_id = localStorage.getItem("id_parceiro");
      const url = `http://127.0.0.1:5000/agendamentos/${parceiro_id}`;
      try {
        const response = await axios.get(url);
        console.log("reponse", response);
        const agendamentos = response.data.map((el) => ({
          id_agendamento: el.id_agendamento,
          nome_cliente: el.nome_cliente,
          tipo_servico: el.tipo_servico,
          telefone: el.telefone,
          profissional: el.profissional,
          horario: el.horario,
          valor: el.valor,
          pessoa_id: el.pessoa_id
        }));

        this.agendamentos = agendamentos;
        console.log("this", this.agendamentos);
      } catch (error) {
        console.log(error);
      }
    },
    deleteItem(id_agendamento) {
      // Defina o item que será excluído
      this.deleteItemId = id_agendamento

      // Abra o diálogo de confirmação
      this.confirmDialogVisible = true;
    },

    async atendido() {
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const response = await axios.post("http://127.0.0.1:5000/faturamentos", {
          status: 1,
          nome_cliente: this.nome_cliente,
          telefone: this.telefone,
          tipo_servico: this.tipo_servico,
          profissional: this.profissional,
          horario: this.horario,
          valor: this.valor,
          parceiro_id: parseInt(localStorage.getItem("id_parceiro")),
          pessoa_id: this.pessoa_id
        });
        const idPessoa = this.pessoa_id
        console.log('1id da solicitac', idPessoa)
        this.$q.notify({
          message: "O usuário foi atendido!",
          color: "green",
        });
        const id_agendamento = this.id_agendamento
        await this.excluirItem(id_agendamento)
        
      } catch (error) {
        console.log(error);
        
      } finally {
        this.isLoading = false;
      }
    },

    async recusado() {
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const response = await axios.post("http://127.0.0.1:5000/faturamentos", {
          status: 0,
          nome_cliente: this.nome_cliente,
          telefone: this.telefone,
          tipo_servico: this.tipo_servico,
          profissional: this.profissional,
          horario: this.horario,
          valor: 0,
          parceiro_id: parseInt(localStorage.getItem("id_parceiro")),
          pessoa_id: this.pessoa_id
        });
        const idPessoa = this.pessoa_id
        console.log('1id da solicitac', idPessoa)
        this.$q.notify({
          message: "O usuário não compareceu!",
          color: "orange",
        });
        const id_agendamento = this.id_agendamento
        await this.excluirItem(id_agendamento)
        
      } catch (error) {
        console.log(error);
        
      } finally {
        this.isLoading = false;
      }
    },
    async excluirItem(id) {
      this.isLoading = true;
      console.log('delete item id agend', this.deleteItemId)
      const url = `http://127.0.0.1:5000/agendamentos/${id}`;
      try {
        await axios.delete(url);
        this.getAgendamentos();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    openModalConfirmar(user) {
      console.log("clicado");
      this.id_agendamento = user.id_agendamento
      this.nome_cliente = user.nome_cliente;
      this.telefone = user.telefone;
      this.tipo_servico = user.tipo_servico;
      this.profissional = user.profissional;
      this.horario = user.horario;
      this.valor = user.valor;
      this.parceiro_id = user.parceiro_id;
      this.pessoa_id = user.pessoa_id;
      this.formularioConfirmacao = true;
    },
    openModalConfirmarAusente(user) {
      console.log("clicado");
      this.id_agendamento = user.id_agendamento
      this.nome_cliente = user.nome_cliente;
      this.telefone = user.telefone;
      this.tipo_servico = user.tipo_servico;
      this.profissional = user.profissional;
      this.horario = user.horario;
      this.valor = user.valor;
      this.parceiro_id = user.parceiro_id;
      this.pessoa_id = user.pessoa_id;
      this.formularioConfirmacaoAusente = true;
    },
  },
});
</script>

<style lang="sass" scoped>
.icon
  color: black
  font-size: 20px

.text-subtitle
 font-size: 20px
.my-card
  width: 100%
  max-width: 350px
</style>
