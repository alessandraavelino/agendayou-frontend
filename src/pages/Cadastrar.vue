<template>
  <image-layout-vue></image-layout-vue>
  <div class="half q-pt-xl">
    <div class="content">
      <div class="my-card q-pt-xl card" align="center">
        <q-img src="~../assets/agendayou_logo_login.svg" style="width: 100px"/>
        <h4>Fazer Cadastro</h4>
        <div class="campos">
          <div class="row">
            <div class="col">
              <q-input
                class="q-pb-md"
                label="Nome"
                name="nome"
                type="text"
                v-model="fields.nome"
                required
                filled
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
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
          </div>
          <div class="row">
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
            <div class="col">
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
            style="width: 310px; height: 35px"
            color="primary"
            @click="cadastrar"
            type="submit"
            label="cadastrar-se"
            rounded
            :disable="
              !validarEmail(fields.email) ||
              !validarSenha(fields.senha) ||
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
        Ao se cadastrar você concorda com todos os nossos
        <a
          href="https://drive.google.com/u/3/uc?id=1L1licA1jrxmQoUlAk0Ye4klth1tbjrp7&export=download"
          download="termo-privacidade-agendayou"
          >Termos e Política de Privacidade</a
        >.
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
import { API } from "../api/api";
import ImageLayoutVue from 'src/components/login/ImageLayout';


export default {
  name: "Cadastrar",

  components: {
    ImageLayoutVue
  },

  data() {
    return {
      fields: {
        nome: "",
        email: "",
        telefone: "",
        senha: "",
        confirmarSenha: "",
      },
      senhaIgualMessage: "As senhas digitadas não coincidem!",
      senhaErrorMessage: "A senha deve ter pelo menos 8 caractéres.",
      emailErrorMessage: "Por favor, insira um e-mail válido.",
      telefoneErrorMessage: "Telefone inválido!",

      isPwd: ref(true),
      isLoading: false,
      alert: false,
    };
  },

  methods: {
    validarTelefone(telefone) {
      const telefoneRegex = /^(\(\d{2}\)\s)?\d{4,5}-\d{5}$/;
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
          telefone: this.fields.telefone,
        };
        const response = await axios.post(`${API}/clientes`, data);
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
  background: #4b56d2;
  background: -webkit-linear-gradient(to left, #8f94fb, #4b56d2);
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

.col {
  padding-right: 10px;
}

p {
  padding-top: 50px;
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

.campos {
  width: 600px;
}

@media only screen and (max-width: 600px) {
  .area {
    display: none;
  }
  .half {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .half {
    width: 100%;
  }

  .card {
    width: auto;
    margin: 0 20px;
  }

  .row {
    flex-direction: column;
  }

  .col {
    padding-right: 0;
    margin-bottom: 10px;
  }

  .q-input,
  .q-select {
    width: 100%;
  }

  .campos {
    width: 320px;
  }

  .content {
    margin-top: -50px;
  }
}
</style>
