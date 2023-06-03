<template>
  <div class="half">
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>

        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>

        <li></li>
      </ul>

      <div class="asset window-height window-width row items-center">
        <div class="bg-login">
          <img src="~assets/logo-login.svg" />
        </div>
      </div>
    </div>
  </div>
  <div class="half">
    <div class="q-pt-xl">
      <div class="my-card q-pa-md card" align="center">
        <h4>Fazer Login</h4>
        <div class="q-gutter-md" style="width: 360px">
          <q-input
            filled
            type="email"
            v-model="email"
            required
            :error-message="emailErrorMessage"
            :error="!validarEmail(email) && email !== ''"
            label="E-mail"
          />
          <q-input
            filled
            v-model="senha"
            required
            :error="!validarSenha(senha) && senha !== ''"
            :error-message="senhaErrorMessage"
            label="Senha"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div style="margin-left: 60%">
            <p class="textLink" @click="esqueciSenhaModal = true">
              Esqueceu a senha?
            </p>
          </div>
          <q-btn
            style="width: 310px; height: 35px"
            color="primary"
            @click="login"
            type="submit"
            label="entrar"
            :disable="!validarEmail(email) || !validarSenha(senha)"
          >
            <div v-if="isLoading">
              <q-spinner-facebook color="white" size="20px" />
              <q-tooltip :offset="[0, 8]">QSpinnerFacebook</q-tooltip>
            </div>
          </q-btn>
        </div>
        <div class="q-ma-md">
          <p>Ainda não possui uma conta?</p>
          <p class="textLink" @click="cadastrarPage">Cadastrar-se</p>
        </div>
      </div>
      <hr />
      <div class="parceria q-pt-sm">
        <p>Deseja se tornar parceiro?</p>
        <q-btn
          type="submit"
          @click="solicitarParceria = true"
          label="solicitar parceria"
          class="button-parc"
          rounded
        />
      </div>
    </div>
    <q-dialog v-model="solicitarParceria" persistent>
      <q-card>
        <q-card-section class="bg-blue">
          <div class="text-h6" style="color: white">Solicitar parceria</div>
        </q-card-section>

        <q-card-section class="q-pt">
          <div class="q-pa-md">
            <div class="q-gutter-md" style="width: 500px">
              <q-input v-model="parceriaFields.nome" label="Nome" />
              <q-input v-model="parceriaFields.nomeFantasia" label="Nome Fantasia" />
              <q-select v-model="parceriaFields.categoria" :options="optionsCategorias" label="Categoria" @update:modelValue="getCategoria" />
              <q-input
                v-model="parceriaFields.email"
                :error="
                  !validarEmail(parceriaFields.email) &&
                  parceriaFields.email !== ''
                "
                :error-message="emailErrorMessage"
                label="E-mail"
              />
              <q-input
                v-model="parceriaFields.cnpj"
                :error="
                  !validarCnpj(parceriaFields.cnpj) &&
                  parceriaFields.cnpj !== ''
                "
                :error-message="cnpjErrorMessage"
                label="CNPJ"
              />
              <q-input
                v-model="parceriaFields.qtdFunc"
                type="number"
                label="Qtd. de Funcionários"
              />
              <q-input
                :error="
                  !validarDescricao(parceriaFields.descricao) &&
                  parceriaFields.descricao !== ''
                "
                :error-message="descricaoErrorMessage"
                v-model="parceriaFields.descricao"
                label="Descreva o seu negócio"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="cancelar" color="red" v-close-popup />
          <q-btn
            flat
            label="enviar"
            color="primary"
            @click="enviarSolicitacao"
            :disable="
              !validarDescricao(parceriaFields.descricao) ||
              !validarCnpj(parceriaFields.cnpj) ||
              !validarEmail(parceriaFields.email)
            "
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmSolicitacao">
      <q-card>
        <q-card-section>
          <div class="text-h6" style="color: green">Sucesso!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ mensagemConfirm }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="esqueciSenhaModal" persistent>
      <q-card>
        <q-card-section class="bg-blue">
          <div class="text-h6" style="color: white">
            Digite seu e-mail para receber o código para redefinição de senha
          </div>
        </q-card-section>

        <q-card-section class="q-pt">
          <div class="q-pa-md">
            <div class="q-gutter-md" style="width: 500px">
              <q-input v-model="emailRedefinir" label="E-mail" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="cancelar" color="red" v-close-popup />
          <q-btn
            flat
            label="enviar"
            color="primary"
            @click="enviarEmailRedefincao"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="codeRecebido" persistent>
      <q-card>
        <q-card-section class="bg-blue">
          <div class="text-h6" style="color: white">
            Insira o código que você recebeu no e-mail
          </div>
        </q-card-section>

        <q-card-section class="q-pt">
          <div class="q-pa-md">
            <div class="q-gutter-md" style="width: 500px">
              <q-input v-model="emailRedefinir" label="Código" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="cancelar" color="red" v-close-popup />
          <q-btn
            flat
            label="enviar"
            color="primary"
            @click="confirmCode"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="novaSenhaModal" persistent>
      <q-card>
        <q-card-section class="bg-blue">
          <div class="text-h6" style="color: white">
            Insira o código recebido
          </div>
        </q-card-section>

        <q-card-section class="q-pt">
          <div class="q-pa-md">
            <div class="q-gutter-md" style="width: 500px">
              <q-input v-model="emailRedefinir" label="E-mail" />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="cancelar" color="red" v-close-popup />
          <q-btn flat label="enviar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { validate } from "cnpj";
export default {
  name: "Login",

  data() {
    return {
      email: "",
      senha: "",
      emailRedefinir: "",
      isPwd: ref(true),
      isLoading: false,
      senhaErrorMessage: "Por favor, insira uma senha válida!",
      emailErrorMessage: "Por favor, insira um e-mail válido!",
      esqueciSenhaModal: false,
      solicitarParceria: false,
      confirmSolicitacao: false,
      codeRecebido: false,
      optionsCategorias: [
      ],
      parceriaFields: {
        nome: "",
        nomeFantasia: "",
        email: "",
        cnpj: "",
        qtdFunc: 0,
        descricao: "",
      },
      descricaoErrorMessage:
        "Sua descrição deve conter pelo menos 100 caractéres",
      cnpjErrorMessage: "CNPJ inválido!",
    };
  },
  async mounted() {
    await this.getCategoria();
  },

  methods: {
    validarEmail(email) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(email);
    },

    validarSenha(senha) {
      return senha.length >= 8;
    },

    async login() {
      console.log("clicado");
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const response = await axios.post("http://127.0.0.1:5000/login", {
          email: this.email,
          senha: this.senha,
        });
        console.log("response login", response);

        localStorage.setItem("key", response.data.key);
        localStorage.setItem("tipo_pessoa", response.data.pessoa.tipo_pessoa);
        localStorage.setItem("nome", response.data.pessoa.nome);
        localStorage.setItem("telefone", response.data.pessoa.telefone);
        localStorage.setItem("id_parceiro", response.data.parceiro.id_parceiro);
        localStorage.setItem("categoria", response.data.parceiro.categoria);
        localStorage.setItem("id_pessoa", response.data.pessoa.id_pessoa);

        


        this.$router.push("/dashboard");
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: "Credenciais inválidas! Tente novamente!",
          color: "red",
        });
      } finally {
        this.isLoading = false;
      }
    },

    async enviarSolicitacao() {
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://127.0.0.1:5000/solicitarparceria",
          {
            nome: this.parceriaFields.nome,
            nome_fantasia: this.parceriaFields.nomeFantasia,
            email: this.parceriaFields.email,
            cnpj: this.parceriaFields.cnpj,
            qtdFunc: parseInt(this.parceriaFields.qtdFunc),
            descricao: this.parceriaFields.descricao,
            categoria: this.parceriaFields.categoria.label
          }
        );
        this.confirmSolicitacao = true;
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

    async enviarEmailRedefincao() {
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const response = await axios.post(
          "http://127.0.0.1:5000/esquecisenha",
          {
            email: this.emailRedefinir,
          }
        );
        this.codeRecebido = true;
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
    async confirmCode() {
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const response = await axios.post(
          `http://127.0.0.1:5000/solicitarparceria/${id_pessoa}`,
          {
            nome: this.parceriaFields.nome,
            email: this.parceriaFields.email,
            cnpj: this.parceriaFields.cnpj,
            qtdFunc: parseInt(this.parceriaFields.qtdFunc),
            descricao: this.parceriaFields.descricao,
          }
        );
        this.confirmSolicitacao = true;
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
    async getCategoria() {
      const url = "http://127.0.0.1:5000/categorias";
      try {
        const response = await axios.get(url);
        const allCategorias = response.data.map((el) => ({
          value: el.id_categoria,
          label: el.categoria,
        }));

        this.optionsCategorias = allCategorias;
        console.log('all ccategorias', this.optionsCategorias)

      } catch (error) {
        console.log(error);
      }
    },
    cadastrarPage() {
      console.log("lcicado");
      this.$router.push("/cadastrar");
    },

    openSolicitacaoParceria() {
      this.solicitarParceria = true;
    },

    validarDescricao(descricao) {
      return descricao.length >= 50;
    },
    validarCnpj(cnpj) {
      if (validate(cnpj)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
* {
  overflow-y: hidden;
  overflow-x: hidden;
  overflow: hidden;
}

.area {
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  overflow: hidden;
}

.circles {
  top: 0;
  left: 0;
  width: 100%;
  height: 98.3%;
  z-index: 0;
  overflow: hidden;
}

.bg-login {
  z-index: 2;
  overflow: hidden;
}
.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 10s linear infinite;
  bottom: 100px;
  overflow: hidden;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
  overflow: hidden;
}

.bg-img {
  margin: 0 auto; /* centraliza horizontalmente */
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
  overflow: hidden;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
  overflow: hidden;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
  overflow: hidden;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
  overflow: hidden;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
  overflow: hidden;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  overflow: hidden;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 10s;
  overflow: hidden;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 12s;
  animation-duration: 6s;
  overflow: hidden;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
  overflow: hidden;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
    overflow: hidden;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
    overflow: hidden;
  }
}
.half {
  width: 50%;
  height: 100%;
  float: left;
  text-align: center;
  overflow: hidden;
}

hr {
  width: 70%;
  overflow: hidden;
}

.button-parc {
  border: 1px solid black;
  border-radius: 20;
  border-width: 1px;
  padding: 10px 20px;
  background-color: white;
  color: black;
  font-size: 16px;
  cursor: pointer;
}

.textLink {
  color: #0775f3;
  cursor: pointer;
}
</style>
