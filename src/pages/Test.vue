<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Alert" color="primary" @click="alert = true" />

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section class="bg-blue">
          <div class="text-h6" style="color: white">Solicitar parceria</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <div class="q-gutter-md" style="width: 500px">
              <q-input v-model="nome" label="Nome" />
              <q-input v-model="email" label="E-mail" />
              <q-input v-model="cnpj" label="CNPJ" />
              <q-input
                v-model="qtdFuncion"
                type="number"
                label="Qtd. de Funcionários"
              />
              <q-input v-model="descricao" label="Descreva o seu negócio" />
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

export default {
  setup() {
    return {
      alert: ref(false),
    };
  },
};
</script>
