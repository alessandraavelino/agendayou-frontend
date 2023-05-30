<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 100%">
      <q-input v-model="buscar" label="Buscar..." style="max-width: 300px">
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-tabs
        v-model="tab"
        inline-label
        class="bg-primary text-white shadow-5"
        outside-arrows
        mobile-arrows
      >
        <q-tab name="saude" icon="medical_services" label="Saúde" />

        <q-tab name="beleza" icon="star_outline" label="Beleza" />
        <q-tab
          name="consertos"
          icon="construction"
          label="Consertos e Reparos"
        />
        <q-tab name="petshop" icon="pets" label="Petshop" />
        <q-tab name="educacao" icon="book" label="Educação" />
        <q-tab name="alimentacao" icon="lunch_dining" label="Alimentação" />
      </q-tabs>
    </div>

    <q-tab-panels
      v-model="tab"
      animated
      swipeable
      vertical
      transition-prev="jump-up"
      transition-next="jump-up"
    >
      <q-tab-panel name="beleza">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            flat
            bordered
            v-for="(servico, id_servico) in getServicosPorCategoria('Beleza')"
            :key="id_servico"
            v-show="isCategoriaSelecionada('beleza')"
          >
            <q-img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1787&q=80"
            />

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

              <q-rating v-model="stars" :max="5" size="20px" />
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
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="event" />
              <q-btn flat color="primary" @click="openModalAgendar(servico)">
                Agendar
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-tab-panel>
      <q-tab-panel name="petshop">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            flat
            bordered
            v-for="(servico, id_servico) in getServicosPorCategoria('PetShop')"
            :key="id_servico"
            v-show="isCategoriaSelecionada('petshop')"
          >
            <q-img
              src="https://images.unsplash.com/photo-1651777000971-42922a2e12ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />

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

              <q-rating v-model="stars" :max="5" size="20px" />
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
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="event" />
              <q-btn flat color="primary" @click="openModalAgendar(servico)">
                Agendar
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-tab-panel>

      <q-tab-panel name="consertos">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            flat
            bordered
            v-for="(servico, id_servico) in getServicosPorCategoria(
              'Consertos'
            )"
            :key="id_servico"
            v-show="isCategoriaSelecionada('consertos')"
          >
            <q-img
              src="https://images.unsplash.com/photo-1651777000971-42922a2e12ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            />

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

              <q-rating v-model="stars" :max="5" size="20px" />
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
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="event" />
              <q-btn flat color="primary" @click="openModalAgendar(servico)">
                Agendar
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-tab-panel>
      <q-tab-panel name="educacao">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            flat
            bordered
            v-for="(servico, id_servico) in getServicosPorCategoria('Educação')"
            :key="id_servico"
            v-show="isCategoriaSelecionada('educacao')"
          >
            <q-img
              src=""
            />

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

              <q-rating v-model="stars" :max="5" size="20px" />
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
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat round icon="event" />
              <q-btn flat color="primary" @click="openModalAgendar(servico)">
                Agendar
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h4 q-mb-md">Movies</div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
  <q-dialog v-model="formularioConfirmacao" persistent>
    <q-card>
      <q-card-section class="bg-blue">
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
          <div class="q-gutter-md" :disable="true" style="width: 500px">
            <div class="q-gutter-md">
              <label>Selecione o horário</label>
            </div>
            <div class="q-pa-md" style="max-width: 300px">
              <q-input filled v-model="date">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
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
                      <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
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
import { ref } from "vue";
import { reactive, computed } from "vue";
import axios from "axios";
export default {
  data() {
    return {
      date: ref("2019-02-01 12:44"),
      formularioConfirmacao: false,
      tab: ref("saude"),
      servicos: "",
      categoria: "",
      datasDisponiveis: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },

  created() {
    if (!this.tab) {
      this.tab = "beleza";
    }
  },

  mounted() {
    this.getServicos();
  },
  methods: {
    async getServicos() {
      console.log("testeeeee")
      this.loading = true;
      const url = "http://127.0.0.1:5000/servicos";
      try {
        const response = await axios.get(url);
        console.log("reponse".response);
        const servicos = response.data.map((el) => ({
          id_servico: el.id_servico,
          nome_parceiro: el.nome_parceiro,
          tipo_servico: el.tipo_servico,
          profissional: el.profissional,
          valor: el.valor,
          horario: el.horario,
          categoria: el.categoria,
        }));

        // const horarios = servicos.filter((el) => el.horario1)
        // console.log('horarios teste', horarios)

        console.log("servicos", servicos);

        this.servicos = servicos;
        console.log("this", this.servicos);
      } catch (error) {
        console.log(error);
      }
    },

    isCategoriaSelecionada(categoria) {
      if (!this.tab || !categoria) {
        return this.tab === "saude";
      }
      return this.tab === categoria;
    },

    getServicosPorCategoria(categoria) {
      console.log("categoria");
      return this.servicos.filter((servico) => servico.categoria === categoria);
    },

    openModalAgendar(servico) {
      console.log("clicado");
      this.inputNome = localStorage.getItem("nome");
      this.inputTelefone = localStorage.getItem("telefone");
      this.inputParceiro = servico.nome_parceiro;
      this.inputServico = servico.tipo_servico;
      this.inputProfissional = servico.profissional;
      this.formularioConfirmacao = true;
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
