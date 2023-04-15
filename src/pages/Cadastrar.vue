<template>
  <div class="q-pa-md">

    <h4>Cadastrar-se</h4>
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="Nome" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input outlined v-model="text" placeholder="Data de Nascimento" :dense="dense">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="CPF" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="Telefone" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="CEP" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="Estado" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="Cidade" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="Bairro" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="Rua" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="Número" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="E-mail" :dense="dense" />
    </div>

    <div class="q-gutter-y-md q-pt-md column" style="max-width: 300px">
      <q-input filled v-model="ph" label="Senha" :dense="dense" />
    </div>
  </div>
  <q-btn
    color="primary"
    @click="login"
    type="submit"
    label="Cadastrar"
    rounded
  >
  </q-btn>
</template>

<script>
export default {
};
</script>

<style>
body {
  background-color: rgb(249, 249, 249);
}
</style>
