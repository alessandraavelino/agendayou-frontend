<template>
  <div class="half ">
    <div class="area q-pt-xl" align="center">
      
      <div class="asset  q-pt-xl window-height">
        <div class="bg-login q-pt-xl">
          <img class="q-pt-xl" style="width: 600px; height: 400px" src="~assets/bg-login.svg" />
        </div>
      </div>
    </div>
  </div>
  <div class="half q-p-xl">
    <div class="">
      <div class="my-card q-pa-sm card" align="center">
        <h5>Fazer Cadastro</h5>
        <div class="q-gutter-sm" style="width: 660px">
          <q-input
            label="Nome"
            name="nome"
            type="text"
            v-model="fields.nome"
            required
            filled
          />
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-input
                label="CPF"
                name="cpf"
                mask="###.###.###-##"
                placeholder="XXX.XXX.XXX-XX"
                v-model="fields.cpf"
                :error-message="CpfErrorMessage"
                :error="!validarCpf(fields.cpf) && fields.cpf !== ''"
                required
                filled
              />
            </div>
            <div class="col">
              <q-input filled type="date" v-model="fields.dt_nasc" required />
            </div>
          </div>
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-input
                label="CEP"
                name="cep"
                mask="#####-###"
                placeholder="XXXXX-XXX"
                v-model="fields.cep"
                :error-message="cepErrorMessage"
                :error="!validarCep(fields.cep) && fields.cep !== ''"
                required
                filled
              />
            </div>
            <div class="col">
              <q-select
                label="Estado"
                name="estado"
                type="text"
                v-model="fields.estado"
                :options="optionsEstado"
                @update:modelValue="getEstado"
                required
                filled
              />
            </div>
          </div>
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-select
                label="Cidade"
                name="cidade"
                type="text"
                v-model="fields.cidade"
                :options="optionsCidade"
                @update:modelValue="getCidade"
                required
                filled
              />
            </div>
            <div class="col">
              <q-input
                label="Bairro"
                name="bairro"
                type="text"
                v-model="fields.bairro"
                required
                filled
              />
            </div>
          </div>
          <div class="col">
            <q-input
              label="Rua"
              name="rua"
              type="text"
              v-model="fields.rua"
              required
              filled
            />
          </div>
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-input
                label="E-mail"
                name="email"
                type="email"
                v-model="fields.email"
                :error-message="emailErrorMessage"
                :error="!validarEmail(fields.email) && fields.email !== ''"
                required
                filled
              />
            </div>
            <div class="col">
              <q-input
                label="Telefone"
                name="telefone"
                mask="(##) ####-#####"
                placeholder="(DD) XXXXX-XXXX"
                v-model="fields.telefone"
                :error="
                  !validarTelefone(fields.telefone) && fields.telefone !== ''
                "
                :error-message="telefoneErrorMessage"
                required
                filled
              />
            </div>
          </div>
          <div class="row">
            <div class="col" style="padding-right: 10px">
              <q-input
                label="Senha"
                name="senha"
                v-model="fields.senha"
                :error="!validarSenha(fields.senha) && fields.senha !== ''"
                :error-message="senhaErrorMessage"
                :type="isPwd ? 'password' : 'text'"
                required
                filled
              >
              </q-input>
            </div>
            <div class="col">
              <q-input
                label="Confirmar senha"
                name="confirmarSenha"
                v-model="fields.confirmarSenha"
                :type="isPwd ? 'password' : 'text'"
                :error="
                  !validarSenhaIgual(fields.senha, fields.confirmarSenha) &&
                  fields.confirmarSenha !== ''
                "
                :error-message="senhaIgualMessage"
                filled
                required
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
            :disable="
              !validarEmail(fields.email) ||
              !validarSenha(fields.senha) ||
              !validarCep(fields.cep) ||
              !validarCpf(fields.cpf) ||
              !validarTelefone(fields.telefone)
            "
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
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Cadastro realizado com sucesso!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Seja bem-vindo(a) ao nosso sistema. É um prazer ter você aqui! Faça
          login para começar a agendar algum serviço.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="IR PARA LOGIN"
            color="primary"
            @click="navToLogin"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      telefoneErrorMessage: "Telefone inválido!",
      optionsEstado: [],
      optionsCidade: [],

      isPwd: ref(true),
      isLoading: false,
      alert: false,
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
      const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
      return cepRegex.test(cep);
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
        this.alert = true;
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
      } catch (error) {
        console.log(error);
      }
    },

    navToLogin() {
      this.$router.push("/Login");
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
  background: #4B56D2;
  background: -webkit-linear-gradient(to left, #8f94fb, #4B56D2);
  overflow: hidden;
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