<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-tabs v-model="tab" class="text-teal">
        <template v-for="tabItem in tabs" :key="tabItem.name">
          <q-tab :name="tabItem.name" :icon="tabItem.icon" :label="tabItem.label" />
        </template>
      </q-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const tab = ref('mails')
    const tabs = [
      { name: 'mails', icon: 'mail', label: 'Mails' },
      { name: 'alarms', icon: 'alarm', label: 'Alarms' },
      { name: 'movies', icon: 'movie', label: 'Movies' },
      // Add more tab items as needed
    ]

    return {
      tab,
      tabs
    }
  }
}
</script>
