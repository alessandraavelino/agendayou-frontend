<template>
  <image-layout-vue></image-layout-vue>
  <div class="half flex-center">
    <div class="q-pt-xl">
      <div class="my-card q-pa-md card" align="center">
        <q-img src="~../assets/agendayou_logo_login.svg" style="width: 100px"/>
        <h4>Fazer Login</h4>
        <div class="q-pa-md" style="width: 360px">
          <q-input
            filled
            type="email"
            v-model="email"
            required
            label="E-mail"
            class="q-pb-md"
          />
          <q-input
            filled
            v-model="senha"
            required
            label="Senha"
            class="q-pb-md"
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
          <div style="margin-left: 50%">
            <p class="textLink" @click="esqueciSenhaModal = true">
              Esqueceu a senha?
            </p>
          </div>
          <q-btn
            style="width: 310px; height: 35px"
            color="primary"
            @click="login"
            type="submit"
            rounded
            label="entrar"
            :disable="!validarEmail(email) || !validarSenha(senha)"
          >
            <div v-if="isLoading">
              <q-spinner-facebook color="white" size="20px" />
              <q-tooltip :offset="[0, 8]">QSpinnerFacebook</q-tooltip>
            </div>
          </q-btn>
        </div>
        <div class="q-ma-sm">
          <p>Ainda não possui uma conta?</p>
          <p class="textLink" @click="cadastrarPage">Cadastrar-se</p>
        </div>
      </div>
      <hr />
      <div class="parceria">
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
        <q-card-section class="bg-primary">
          <div class="text-h6" style="color: white">Solicitar parceria</div>
        </q-card-section>

        <q-card-section class="q-pt">
          <div class="q-pa-md">
            <div class="q-gutter-md" style="width: 500px">
              <q-input v-model="parceriaFields.nome" label="Nome fantasia" />
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
        <q-card-section class="bg-primary">
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
            :disable="!emailRedefinir"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="codeRecebido" persistent>
      <q-card>
        <q-card-section class="bg-primary">
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
        <q-card-section class="bg-primary">
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
    <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="alert" @hide="dialogHidden">
      <q-card>
        <q-card-section>
          <div class="text-h6">Atenção</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          O AgendaYOU é uma plataforma inovadora de cadastro e agendamento de serviços, atualmente em 
          fase de aprimoramento contínuo. Embora já esteja totalmente funcional e disponível para uso, 
          estou buscando aperfeiçoá-lo ainda mais. 
          <br>
          Este projeto foi concebido como o produto de 
          software para a apresentação final do curso de TSI, refletindo em uma solução completa e 
          eficiente para atender aos usuários.
          <br>
          - Alee
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="conhecer melhor"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { API } from '../api/api'
import ImageLayoutVue from 'src/components/login/ImageLayout';
export default {
  name: "Login",
  components: {
    ImageLayoutVue
  },

  data() {
    return {
      alert: false,
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
        email: "",
        qtdFunc: 0,
        descricao: "",
      },
      descricaoErrorMessage:
        "Sua descrição deve conter pelo menos 100 caractéres",
        mensagemConfirm: "Sua solicitação foi enviada com sucesso! Iremos analisar seus dados e em breve você receberá um retorno através do e-mail informado."
    };
  },

  created() {
    // Verifica se o diálogo já foi exibido anteriormente usando o localStorage
    const dialogAlreadyShown = localStorage.getItem('dialogShown');

    if (!dialogAlreadyShown) {
      // Se o diálogo ainda não tiver sido exibido, mostra-o
      this.alert = true;
    }
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

    dialogHidden() {
      // Define o valor do localStorage para informar que o diálogo já foi exibido
      localStorage.setItem('dialogShown', true);
    },

    async login() {
      const $q = useQuasar();
      try {
        this.isLoading = true;
        const response = await axios.post(`${API}/login`, {
          email: this.email,
          senha: this.senha,
        });

        localStorage.setItem("key", response.data.key);
        localStorage.setItem("tipo_pessoa", response.data.pessoa.tipo_pessoa);
        localStorage.setItem("nome", response.data.pessoa.nome);
        localStorage.setItem("foto", response.data.pessoa.foto);
        localStorage.setItem("telefone", response.data.pessoa.telefone);
        localStorage.setItem("id_parceiro", response.data.parceiro.id_parceiro);
        localStorage.setItem("nome_fantasia", response.data.parceiro.nome_fantasia);
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
          `${API}/solicitarparceria`,
          {
            nome: this.parceriaFields.nome,
            email: this.parceriaFields.email,
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
          `${API}/esquecisenha`,
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
          `${API}/solicitarparceria/${id_pessoa}`,
          {
            nome: this.parceriaFields.nome,
            email: this.parceriaFields.email,
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
      const url = `${API}/categorias`;
      try {
        const response = await axios.get(url);
        const allCategorias = response.data.map((el) => ({
          value: el.id_categoria,
          label: el.categoria,
        }));

        this.optionsCategorias = allCategorias;

      } catch (error) {
        console.log(error);
      }
    },
    cadastrarPage() {
      this.$router.push("/cadastrar");
    },

    openSolicitacaoParceria() {
      this.solicitarParceria = true;
    },

    validarDescricao(descricao) {
      return descricao.length >= 50;
    }
  },
};
</script>

<style scoped>
* {
  overflow-y: hidden;
  overflow-x: hidden;
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

@media only screen and (max-width: 600px) {
  .area {
    display: none;
  }
  .half {
    width: 100%
  }
}
</style>
