<template>
  <div>
    <h2 v-if="showComponent">Componente a ser atualizado</h2>
    <q-btn label="Atualizar" @click="showComponent = !showComponent" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showComponent: true
    }
  }
}
</script>
