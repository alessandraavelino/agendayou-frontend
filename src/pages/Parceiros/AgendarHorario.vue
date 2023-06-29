<template>
  <q-page class="q-gutter-flex-start q-pa-xl">
    <div class="q-pa-md">
      <div class="row q-pb-md">
        <div class="col">
          <span class="col-4">Agendar Horário</span>
        </div>
      </div>
      <div class="q-pa-md row justify-center">
        <div
          class="q-gutter-md q-pt-md col"
          style="max-width: 600px; margin-right: 60px"
        >
          <!-- First column -->
          <q-input
            outlined
            v-model="inputNome"
            class="q-pa-sm"
            label="Cliente:"
          />
          <q-input
            outlined
            v-model="inputTelefone"
            mask="(##) #####-####"
            class="q-pa-sm"
            label="Telefone:"
          />
          <q-input
            outlined
            v-model="inputServico"
            class="q-pa-sm"
            label="Serviço requerido:"
          />
        </div>
        <div
          class="q-gutter-md q-pt-md col"
          style="max-width: 600px; margin-left: 20px"
        >
          <!-- Second column -->
          <q-input
            outlined
            v-model="inputProfissional"
            class="q-pa-sm"
            label="Profissional:"
          />
          <q-input
            
            outlined
            required
            v-model="inputHorario"
            hint="Selecione a data e hora"
            class="custom-date-picker"
          >
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="inputHorario" mask="DD/MM/YYYY HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
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
                    v-model="inputHorario"
                    mask="DD/MM/YYYY HH:mm"
                    format24h
                  >
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-input
            outlined
            v-model="inputValor"
            type="number"
            class="q-pa-sm"
            label="Valor:"
          />
        </div>
        <q-dialog v-model="confirmDialogVisible" persistent>
          <q-card>
            <q-card-section>
              <div class="text-h6">
                Confirma que todas as informações estão corretas?
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="revisar" color="gray" v-close-popup />
              <q-btn
                flat
                label="tudo certo"
                @click="agendarHorario"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <div class="text-center q-pt-xl">
      <q-btn
        label="realizar agendamento"
        rounded
        color="primary"
        @click="openDialogConfirm()"
        :disable="inputHorario === '' || inputCliente === '' || inputProfissional === '' || inputServico === '' || inputServico === '' || inputValor === '' || inputTelefone === '' "
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import { API } from '../../api/api'
export default defineComponent({
  name: "AgendarHorario",
  data() {
    return {
      confirmDialogVisible: false,
      inputNome: "",
      inputTelefone: "",
      inputServico: "",
      inputProfissional: "",
      inputHorario: "",
      inputValor: "",
    };
  },

  mounted() {},

  methods: {
    async agendarHorario(servico) {
      try {
        this.isLoading = true;
        const response = await axios.post(
          `${API}/agendamentos`,
          {
            nome_cliente: this.inputNome,
            telefone: this.inputTelefone,
            tipo_servico: this.inputServico,
            profissional: this.inputProfissional,
            horario: this.inputHorario,
            valor: this.inputValor,
            parceiro_id: localStorage.getItem("id_parceiro"),
          }
        );
        this.$q.notify({
          message: "Cliente agendado com sucesso!",
          color: "green",
        });
        this.formularioConfirmacao = false;
      } catch (error) {
        console.log(error);
        this.$q.notify({
          message: "Ocorreu um erro! Tente novamente!",
          color: "red",
        });
      } finally {
        this.isLoading = false;
      }
    },

    openDialogConfirm() {
      this.confirmDialogVisible = true;
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

.custom-date-picker {
  width: 95%;
}

</style>
