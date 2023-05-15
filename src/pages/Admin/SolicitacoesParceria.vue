<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <span class="col-4 text-h6">Solicitações de Parceria</span>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card bg-white text-black"
        v-for="(user, id_solicitacao) in solicitacoes"
        :key="id_solicitacao"
      >
        <q-card-section>
          <div class="text-h6">{{ user.nome }}</div>
          <div class="text-subtitle2">{{ user.nome_fantasia }}</div>
          <div class="text-subtitle2">{{ user.cnpj }}</div>
          <div class="text-subtitle3">{{ user.email }}</div>
          <div class="text-subtitle4">{{ user.qtdFuncion }}</div>
          <div class="text-subtitle4">{{ user.categoria }}</div>
          <div class="text-subtitle5">
            {{ user.descricao }}
          </div>
        </q-card-section>
        <q-separator white />
        <q-card-actions>
          <q-btn
            flat
            class="bg-green text-white"
            @click="openModalAceitar(user)"
            >Aceitar</q-btn
          >
          <q-btn
            flat
            class="bg-red text-white"
            @click="deleteSolicitacoes(user.id_solicitacao, user.email)"
            >Recusar</q-btn
          >
        </q-card-actions>
      </q-card>
    </div>
    <div class="flex flex-center" v-if="isLoading">
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>

  <q-dialog v-model="formularioConfirmacao" persistent>
    <q-card>
      <q-card-section class="bg-blue">
        <div class="text-h6" style="color: white">Aprovar Parceria</div>
      </q-card-section>

      <q-card-section class="q-pt">
        <div class="q-pa-md">
          <div class="q-gutter-md" style="width: 500px">
            <q-input v-model="inputNome" value="nome" label="Nome" />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input v-model="inputNomeFantasia" value="nome" label="Nome" />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input
              v-model="inputCategoria"
              value="categoria"
              label="Categoria"
            />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input v-model="inputCnpj" value="cnpj" label="CNPJ" />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input v-model="inputEmail" value="email" label="E-mail" />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input v-model="inputSenha" value="senha" label="Senha" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="cancelar" color="red" v-close-popup />
        <q-btn flat label="enviar" color="primary" @click="enviarFeedback" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
export default defineComponent({
  name: "SolicitacoesParceria",
  data() {
    return {
      formularioConfirmacao: false,
      solicitacoes: "",
      isLoading: false,
      inputNome: "",
      inputNomeFantasia: "",
      inputEmail: "",
      inputCnpj: "",
      inputCategoria: ""
    };
  },

  async mounted() {
    await this.getSolicitacoes();
  },

  methods: {
    async getSolicitacoes() {
      this.loading = true;
      const url = "http://127.0.0.1:5000/solicitarparceria";
      try {
        const response = await axios.get(url);
        console.log("reponse".response);
        const solicitacoes = response.data.map((el) => ({
          id_solicitacao: el.id_solicitacao,
          nome: el.nome,
          nome_fantasia: el.nome_fantasia,
          cnpj: el.cnpj,
          email: el.email,
          qtdFuncion: el.qtdFuncion,
          descricao: el.descricao,
          categoria: el.categoria
        }));

        console.log("solicita", solicitacoes);

        this.solicitacoes = solicitacoes;
        console.log("this", this.solicitacoes);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSolicitacoes(id_solicitacao, email) {
      this.isLoading = true;
      this.solicitacoes.forEach((el) => {
        el.id_solicitacao;
      });
      console.log("id", this.solicitacoes);
      const url = `http://127.0.0.1:5000/solicitarparceria/${id_solicitacao}/${email}`;
      try {
        await axios.delete(url);

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

    async enviarFeedback() {
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const response = await axios.post("http://127.0.0.1:5000/parceiros", {
          nome: this.inputNome,
          nome_fantasia: this.inputNomeFantasia,
          categoria: this.inputCategoria,
          email: this.inputEmail,
          cnpj: this.inputCnpj,
          senha: this.inputSenha,
        });
        
        const email = this.inputEmail;
        console.log('1id da solicitac', email)
        await this.deleteSolicitacoesAprovada(email)
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: "Algo deu errado! Tente novamente!",
          color: "red",
        });
      } finally {
        this.isLoading = false;
      }
    },

    async deleteSolicitacoesAprovada(email) {
      this.isLoading = true;
      console.log("id", this.solicitacoes);
      const url = `http://127.0.0.1:5000/solicitarparceria/${email}`;
      try {
        await axios.delete(url);

        this.$q.notify({
          message: "Parceria aceita!",
          color: "green",
        });
        this.getSolicitacoes();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    openModalAceitar(user) {
      console.log("clicado");
      this.inputNome = user.nome;
      this.inputNomeFantasia = user.nome_fantasia;
      this.inputEmail = user.email;
      this.inputCnpj = user.cnpj;
      this.inputCategoria = user.categoria;
      this.formularioConfirmacao = true;
    },
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
