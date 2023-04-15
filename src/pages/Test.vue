<template>
    <q-select
      v-model="selectedItem"
      :options="options"
      label="Selecione um item"
      @update:modelValue="handleSelect"
    />
  </template>
  
  <script>
  export default {
    name: "Test",
    data() {
      return {
        selectedItem: null,
        options: ['item 1', 'item 2', 'item 3']
      }
    },
    methods: {
      handleSelect(selectedItem) {
        console.log(selectedItem)
        // aqui você pode chamar a função que precisa ser executada
      }
    }
  }
  </script>