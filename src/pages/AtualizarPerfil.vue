<template>
  <div class="q-pa-md row items-start">
    <q-card class="my-profile" style="width: 100%">
      <q-img
        style="height: 200px"
        src="https://cdn.quasar.dev/img/parallax2.jpg"
      />
      <q-item>
        <q-item-section avatar>
          <q-avatar style="height: 70px; width: 70px">
            <q-img :src="inputFoto" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ inputNome }}</q-item-label>
          <q-item-label><strong>{{tipoUsuario }}</strong></q-item-label>
        </q-item-section>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            dense
            color="primary"
            @click="editarItem()"
            icon="edit"
            label="Editar Perfil"
            class="q-ml-md"
          >
          </q-btn>
        </div>
      </q-item>
    </q-card>
  </div>
  <div class="q-px-lg q-py-md">
    <q-timeline color="blue">
      <q-timeline-entry icon="people">
        <template v-slot:subtitle> Clientes mais frequêntes </template>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>

      <q-timeline-entry icon="note">
        <template v-slot:subtitle> Serviços mais desejados </template>

        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </q-timeline-entry>
      <q-timeline-entry icon="tips_and_updates">
        <template v-slot:subtitle> Dicas para expandir o seu negócio </template>

        <div>
          <div class="row">
            <div class="q-pa-md">
              <q-card class="my-card">
                <q-video
                  class="video"
                  src="https://www.youtube.com/embed/7zXTSuKhya8"
                />

                <q-card-section>
                  <div class="text-h6">COMO ESCALAR UM NEGÓCIO EM ATÉ 4 PASSOS SIMPLES!</div>
                  <div class="text-subtitle2">Thiago Nigro</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </q-card-section>
              </q-card>
            </div>
            <div class="q-pa-md">
              <q-card class="my-card">
                <q-video
                  class="video"
                  src="https://www.youtube.com/embed/SKl4L1t4jvA"
                />

                <q-card-section>
                  <div class="text-h6">COMO ATRAIR CLIENTES? (Serve pra QUALQUER NEGÓCIO!)</div>
                  <div class="text-subtitle2">Shirleyson Kaisser</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </q-card-section>
              </q-card>
            </div>
            <div class="q-pa-md">
              <q-card class="my-card">
                <q-video
                  class="video"
                  src="https://www.youtube.com/embed/69l-iaw_Vz0"
                />

                <q-card-section>
                  <div class="text-h6">10 dicas INFALÍVEIS para a GESTÃO FINANCEIRA de um pequeno negócio!</div>
                  <div class="text-subtitle2">Thiago Nigro</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
  <q-dialog v-model="alert" persistent>
    <q-card>
      <q-card-section class="bg-primary color-white">
        <div class="text-h6" style="color: white">Editar Perfil</div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="width: 500px">
        <div class="q-gutter-md">
          <q-input label="Link da Foto de Perfil" v-model="inputFoto" required />
          <q-input label="Nome" v-model="inputNome" required />
          <q-input label="E-mail" v-model="inputEmail" disable required />
          <q-input
            label="Telefone"
            mask="(##) #####-####"
            placeholder="(DD) XXXXX-XXXX"
            v-model="inputTelefone"
            required
            error-message="Formato de telefone inválido!"
            :error="
                  !validarTelefone(inputTelefone) && inputTelefone !== ''
                "
          />
          <q-input type="date" v-model="inputDateNasc" required />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="negative" v-close-popup />
        <q-btn flat label="Limpar" @click="cleanFields" color="clear" />
        <q-btn
          flat
          label="Salvar"
          type="button"
          color="primary"
          @click="atualizarPerfil"
          :disable="!validarTelefone(inputTelefone)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { API } from '../api/api'
export default defineComponent({
  name: "AtualizarPerfil",
  data() {
    return {
      alert: false,
      inputFoto: '',
      inputNome: '',
      tipoUsuario: '',
      inputDateNasc: '',
      inputTelefone: '',
      inputEstado: '',
      inputCidade: '',
      inputBairro: '',
      inputRua: ''


    };
  },

  mounted() {
    this.getPerfil();
  },

  methods: {
    async getPerfil() {
      this.loading = true;
      const pessoa_id = localStorage.getItem("id_pessoa");
      const url = `${API}/pessoas/${pessoa_id}`;
      try {
        const response = await axios.get(url);
        const agendamentos = response.data.map((el) => ({
          id_pessoa: el.id_pessoa,
          foto: el.foto,
          nome: el.nome,
          telefone: el.telefone,
          email: el.email
        }));

        agendamentos.forEach((el) => {
          this.inputNome = el.nome;
          this.inputFoto = el.foto;
          this.inputTelefone = el.telefone
          this.inputEmail = el.email
        });

        this.tipoUsuario = localStorage.getItem("tipo_pessoa")
      } catch (error) {
        console.log(error);
      }
    },

    async atualizarPerfil() {
      const pessoa_id = localStorage.getItem('id_pessoa');
      const url = `${API}/pessoas/${pessoa_id}`;
      const dadosAtualizados = {
        foto: this.inputFoto,
        nome: this.inputNome,
        telefone: this.inputTelefone,
        email: this.inputEmail
      };

      try {
        const response = await axios.put(url, dadosAtualizados);
        this.$q.notify({
          message: "Informações atualizadas com sucesso!",
          color: "green",
        });
      } catch (error) {
        console.log(error);
      }
    },
    
    editarItem() {
      // this.fields.id_servico = row.id_servico;
      // Preencha os campos do formulário com os dados do item a ser editado
      // this.fields.tipo_servico = row.tipo_servico;
      // this.fields.profissional = row.profissional;
      // this.fields.valor = row.valor;
      // this.fields.horario = row.horario;

      // Abra o q-dialog de alerta
      this.alert = true;
    },

    cleanFields() {
      this.inputFoto = ""
      this.inputTelefone = "",
      this.inputNome = ""
    },
    validarTelefone(telefone) {
      const telefoneRegex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
      return telefoneRegex.test(telefone);
    }
  },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px

.video
  height: 250px
</style>
