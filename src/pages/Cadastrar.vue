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

      <div class="window-height window-width row items-center">
        <div class="bg-login">
          <img src="~assets/logo-login.svg" />
        </div>
      </div>
    </div>
  </div>
  <div class="half">
    <div class="">
      <div class="my-card q-pa-sm card" align="center">
        <h5>Fazer Cadastro</h5>
        <div class="q-gutter-sm" style="width: 660px">
          <q-input
            filled
            type="text"
            v-model="fields.nome"
            required
            label="Nome"
          />
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-input
                filled
                type="number_format"
                name="cpf"
                pattern="(\d{3}\.?\d{3}\.?\d{3}-?\d{2})|(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})"
                v-model="fields.cpf"
                required
                label="CPF"
                :error-message="CpfErrorMessage"
                :error="!validarCpf(fields.cpf) && fields.cpf !== ''"
              />
            </div>
            <div class="col">
              <q-input filled type="date" v-model="fields.dt_nasc" required />
            </div>
          </div>
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-input
                filled
                type="cep"
                v-model="fields.cep"
                required
                label="CEP"
                pattern="\d{5}-\d{3}"
                :error-message="cepErrorMessage"
                :error="!validarCep(fields.cep) && fields.cep !== ''"
              />
            </div>
            <div class="col">
              <q-select
                filled
                type="text"
                v-model="fields.estado"
                label="Estado"
                :options="optionsEstado"
                @update:modelValue="getEstado"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-select
                filled
                type="text"
                v-model="fields.cidade"
                required
                :options="optionsCidade"
                label="Cidade"
                @update:modelValue="getCidade"
              />
            </div>
            <div class="col">
              <q-input
                filled
                type="text"
                v-model="fields.bairro"
                required
                label="Bairro"
              />
            </div>
          </div>
          <div class="col">
            <q-input
              filled
              type="text"
              v-model="fields.rua"
              required
              label="Rua"
            />
          </div>
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-input
                filled
                type="email"
                v-model="fields.email"
                required
                label="E-mail"
                :error-message="emailErrorMessage"
                :error="!validarEmail(fields.email) && fields.email !== ''"
              />
            </div>
            <div class="col">
              <q-input
                filled
                type="tel"
                v-model="fields.telefone"
                required
                label="Telefone"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                placeholder="(DD) XXXXX-XXXX"
                :error="
                  !validarTelefone(fields.telefone) && fields.telefone !== ''
                "
                :error-message="senhaIgualMessage"
              />
            </div>
          </div>
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-input
                filled
                v-model="fields.senha"
                required
                label="Senha"
                :error="!validarSenha(fields.senha) && fields.senha !== ''"
                :error-message="senhaErrorMessage"
                :type="isPwd ? 'password' : 'text'"
              >
              </q-input>
            </div>
            <div class="col">
              <q-input
                filled
                v-model="fields.confirmarSenha"
                required
                label="Confirmar senha"
                :type="isPwd ? 'password' : 'text'"
                :error="
                  !validarSenhaIgual(fields.senha, fields.confirmarSenha) &&
                  fields.confirmarSenha !== ''
                "
                :error-message="senhaIgualMessage"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>

          <q-btn
            style="width: 310px; height: 25px"
            color="primary"
            @click="cadastrar"
            type="submit"
            label="cadastrar-se"
            :disable="!validarEmail(fields.email) || !validarSenha(fields.senha) || !validarCep(fields.cep) || !validarCpf(fields.cpf) || !validarTelefone(fields.telefone)"
          >
            <div v-if="isLoading">
              <q-spinner-facebook color="white" size="20px" />
              <q-tooltip :offset="[0, 8]">QSpinnerFacebook</q-tooltip>
            </div>
          </q-btn>
        </div>
      </div>
      <p>
        Ao se cadastrar você concorda com todos os nossos Termos e Política de
        Privacidade.
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
export default {
  name: "Cadastrar",

  data() {
    return {
      fields: {
        nome: "",
        cpf: "",
        dt_nasc: "",
        cep: "",
        estado: "",
        cidade: "",
        bairro: "",
        rua: "",
        email: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
      },
      cepErrorMessage: "CEP inválido!",
      CpfErrorMessage: "CPF inválido!",
      senhaIgualMessage: "As senhas digitadas não coincidem!",
      senhaErrorMessage: "A senha deve ter pelo menos 8 caractéres.",
      emailErrorMessage: "Por favor, insira um e-mail válido.",
      optionsEstado: [],
      optionsCidade: [],

      isPwd: ref(true),
      isLoading: false,
    };
  },

  async mounted() {
    await this.getEstado();
  },
  methods: {
    validarCpf(cpf) {
      cpf = cpf.replace(/\D/g, ""); // remover caracteres não numéricos
      if (cpf.length !== 11) return false; // verificar se tem 11 dígitos

      // calcular primeiro dígito verificador
      let soma = 0;
      for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let resto = soma % 11;
      let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

      // calcular segundo dígito verificador
      soma = 0;
      for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
      }
      resto = soma % 11;
      let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

      // verificar se os dígitos verificadores correspondem
      if (
        parseInt(cpf.charAt(9)) !== digitoVerificador1 ||
        parseInt(cpf.charAt(10)) !== digitoVerificador2
      ) {
        return false;
      }
      return true;
    },

    validarTelefone(telefone) {
      const telefoneRegex = /^(\(\d{2}\)\s)?\d{4,5}-\d{4}$/;
      return telefoneRegex.test(telefone);
    },

    validarEmail(email) {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(email);
    },
    validarSenha(senha) {
      return senha.length >= 8;
    },
    validarSenhaIgual(senha, confirm) {
      return senha === confirm;
    },
    validarCep(cep) {
      const cepRegex = /^[0-9]{8}$/; // Expressão regular para validar CEPs com 8 dígitos
      if (!cepRegex.test(cep)) {
        // CEP inválido
        return false;
      }
      // CEP válido
      return true;
    },
    async cadastrar() {
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const data = {
          email: this.fields.email,
          senha: this.fields.senha,
          nome: this.fields.nome,
          dt_nasc: this.fields.dt_nasc,
          cpf: this.fields.cpf,
          telefone: this.fields.telefone,
          endereco: {
            cep: this.fields.cep,
            estado: this.fields.estado.label,
            cidade: this.fields.cidade.label,
            bairro: this.fields.bairro,
            rua: this.fields.rua,
          },
        };
        const response = await axios.post(
          "http://127.0.0.1:5000/clientes",
          data
        );
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

    async getEstado() {
      const estadoId = this.fields.estado.value;
      console.log("estado val", estadoId); // [13]
      const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
      try {
        const response = await axios.get(url);
        const nomeEstados = response.data.map((el) => ({
          value: el.id,
          label: el.nome,
        }));

        this.optionsEstado = nomeEstados;

        await this.getCidade(estadoId);
        return estadoId;
      } catch (error) {
        console.log(error);
      }
    },

    async getCidade() {
      const estadoId = this.fields.estado.value;
      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`;
      try {
        const response = await axios.get(url);
        const nomeCidades = response.data.map((el) => ({
          value: el.id,
          label: el.nome,
        }));

        this.optionsCidade = nomeCidades;
        console.log("cidade selec", this.fields.cidade.value);
      } catch (error) {
        console.log(error.response.data); // aqui estamos imprimindo a propriedade 'data' da resposta do axios
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
  overflow: hidden;
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
