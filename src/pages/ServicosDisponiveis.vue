<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <div class="flex flex-center">
        <q-input
        v-model="buscar"
        label="Busque por um serviço ou profissioal específico..."
        @input="filtrarResultados"
        style="width: 500px"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
      </div>
      <q-tabs v-model="tab" class="text-primary">
        <template v-for="tabItem in tabs" :key="tabItem.name">
          <q-tab
            :name="tabItem.name"
            :icon="tabItem.icon"
            :label="tabItem.label"
          />
        </template>
      </q-tabs>

      <q-tab-panels v-model="tab" class="q-mt-md">
        <q-tab-panel
          v-for="tabItem in tabs"
          :key="tabItem.name"
          :name="tabItem.name"
        >
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card
            
              class="my-card"
              flat
              bordered
              v-for="(servico, id_servico) in getServicosPorCategoria(
                tabItem.name
              )"
              
              :key="id_servico"
              v-show="filtrarPorNome(servico)"
              
            >
              <q-img :src="servico.foto_parceiro" style="height: 180px" />

              <q-card-section>
                <q-btn
                  fab
                  color="primary"
                  icon="place"
                  class="absolute"
                  style="top: 0; right: 12px; transform: translateY(-50%)"
                />

                <div class="row no-wrap items-center">
                  <div class="col text-h6 ellipsis">
                    {{ servico.nome_parceiro }}
                  </div>
                  <div
                    class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                  >
                    <q-icon name="place" />
                    2,4 km
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                  Serviço: {{ servico.tipo_servico }}
                </div>
                <div class="text-subtitle1">
                  Profissional: {{ servico.profissional }}
                </div>
                <div class="text-caption text-grey">
                  Valor: {{ servico.valor }}
                </div>
                <div class="q-gutter-xs">
                  <q-chip color="green" text-color="white" icon="event">
                    {{ servico.horario }}
                  </q-chip>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-actions>
                <q-btn flat round icon="event" />
                <q-btn :disable="!verifyTypeUser(servico.parceiro_id)" flat color="primary" @click="openModalAgendar(servico)">
                  Agendar
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
  <q-dialog v-model="formularioConfirmacao" persistent>
    <q-card>
      <q-card-section class="bg-primary">
        <div class="text-h6" style="color: white">Agendar Horário</div>
      </q-card-section>

      <q-card-section class="q-pt">
        <div class="q-pa-md">
          <div class="q-gutter-md" style="width: 500px">
            <q-input
              v-model="inputNome"
              :disable="true"
              value="nome"
              label="Nome"
            />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input
              v-model="inputTelefone"
              :disable="true"
              value="nome"
              label="Telefone"
            />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input
              v-model="inputParceiro"
              :disable="true"
              value="cnpj"
              label="Prestador de Serviço"
            />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input
              v-model="inputServico"
              :disable="true"
              value="email"
              label="Tipo de Serviço"
            />
          </div>
          <div class="q-gutter-md" style="width: 500px">
            <q-input
              v-model="inputProfissional"
              :disable="true"
              value="senha"
              label="Profissional"
            />
          </div>
          <div class="q-pt-md">Horário de agendamento</div>
          <q-chip color="green" text-color="white" icon="event">
            {{ inputHorario }}
          </q-chip>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="cancelar" color="red" v-close-popup />
        <q-btn
          flat
          label="confirmar"
          color="primary"
          @click="agendarHorario()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import { ref, computed } from "vue";
import { API } from '../api/api'
export default {
  data() {
    const tabs = [
      { name: "Todos", icon: "apps", label: "Todos" },
      { name: "Beleza", icon: "face_retouching_natural", label: "Beleza" },
      { name: "Educação", icon: "auto_stories", label: "Educação" },
      { name: "Saúde", icon: "health_and_safety", label: "Saúde" },
      { name: "Alimentação", icon: "fastfood", label: "Alimentação" },
      { name: "Consertos", icon: "handyman", label: "Consertos e Reparos" },
      { name: "PetShop", icon: "pets", label: "PetShop" },
      { name: "Dentista", icon: "mood", label: "Dentista" },
      { name: "Lava Car", icon: "no_crash", label: "Lava Car" },
      // Add more tab items as needed
    ];

    const tabPanels = computed(() => {
      return tabs.map((tabItem) => ({
        name: tabItem.name,
        content: tabItem.content,
      }));
    });

    return {
      foto: localStorage.getItem("foto"),
      filtro: "",
      buscar: "",
      formularioConfirmacao: false,
      tab: "Todos",
      servicos: [],
      categoria: "",
      tabs,
      tabPanels,
      parceiro: ''
    };
  },

  mounted() {
    this.getServicos();
  },
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
            parceiro_id: this.inputIdParceiro,
            pessoa_id: localStorage.getItem("id_pessoa"),
          }
        );
        const id = this.inputIdServico
        await this.deleteServicos(id)
        this.$q.notify({
          message: "Seu agendamento foi realizado com sucesso!",
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

    async getServicos() {
      this.loading = true;
      const url = `${API}/servicos`;
      try {
        const response = await axios.get(url);
        const servicos = response.data.map((el) => ({
          id_servico: el.id_servico,
          nome_parceiro: el.nome_parceiro,
          tipo_servico: el.tipo_servico,
          profissional: el.profissional,
          valor: el.valor,
          horario: el.horario,
          categoria: el.categoria,
          parceiro_id: el.parceiro_id,
          foto_parceiro: el.foto_parceiro
        }));

        this.parceiro = servicos.parceiro_id
        console.log('this.parceiro', this.parceiro)

        this.servicos = servicos;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      return dayjs(date).format("DD/MM/YYYY HH:mm");
    },

    filtrarPorNome(servico) {
      if (!this.buscar) {
        return true;
      }

      const nome = servico.nome_parceiro.toLowerCase();
      const termoBusca = this.buscar.toLowerCase();

      return nome.includes(termoBusca);
    },

    getServicosPorCategoria(categoria) {
      let servicosFiltrados = this.servicos;

      if (categoria !== "Todos") {
        servicosFiltrados = servicosFiltrados.filter(
          (servico) => servico.categoria === categoria
        );
      }

      if (this.filtro) {
        servicosFiltrados = servicosFiltrados.filter((servico) =>
          servico.nome_parceiro.toLowerCase().includes(this.filtro)
        );
      }

      return servicosFiltrados;
    },

    filtrarResultados() {
      this.filtro = this.buscar.toLowerCase();
      this.tab = "Todos"; // Reseta a categoria selecionada para "Todos"
    },

    openModalAgendar(servico) {
      this.inputIdServico = servico.id_servico;
      this.inputNome = localStorage.getItem("nome");
      this.inputTelefone = localStorage.getItem("telefone");
      this.inputParceiro = servico.nome_parceiro;
      this.inputServico = servico.tipo_servico;
      this.inputProfissional = servico.profissional;
      this.inputValor = servico.valor;
      this.inputHorario = servico.horario;
      this.inputIdParceiro = servico.parceiro_id;
      this.formularioConfirmacao = true;
    },

    async deleteServicos(id_servico) {
      this.isLoading = true;
      const url = `${API}/servicos/${id_servico}`;
      try {
        await axios.delete(url);

        this.getServicos();
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    verifyTypeUser (parceiro) {
      const id_parceiro = localStorage.getItem("id_parceiro")
      console.log('this.inputIdParceiro', parceiro)

      if (id_parceiro == parceiro) {
        return false
      } else {
        return true
      }
    }
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
