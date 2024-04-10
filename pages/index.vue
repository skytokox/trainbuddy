<script setup lang="ts">
const loading = ref(false)
const selected = ref()
const destinations = ref([])
const forceRender = ref(0)
async function search (q: string) {
  if(q.length == 0) {
    q = 'Warszawa'
  }
  loading.value = true
  console.log(q)
  const users = await $fetch('/api/getStations', { params: { originStation: q } })
  loading.value = false
  return users.stations
}
async function getDepartures() {
  destinations.value = await $fetch(`/api/getDepartures?stationId=${selected.value.id}`)
  forceRender.value += 1
}


</script>

<template>
  <div class="mx-auto w-1/2 text-center min-w-full">
    <div class="py-8">
      <p class="text-5xl">Welcome</p>
      <p class="">Search your train station</p>
    </div>
    <div class="mx-auto min-h-12 max-w-screen-sm">
        <div class="">
          <UInputMenu
              v-model="selected"
              :search="search"
              :loading="loading"
              placeholder="Search for a station"
              option-attribute="name"
              trailing
              by="id"
          />
        </div>
      <button @click="getDepartures">test</button>
    </div>
    <div class="w-3/4 mx-auto">
        <div class="flex flex-row w-full flex-wrap gap-2 justify-center">
          <UButton v-for="destination in destinations" color="white" class="p-1 border-2 border-blue">{{destination.label}}</UButton>
        </div>
        <div class="flex flex-col w-full mx-auto">
          <div v-for="destination in destinations">
            <p>Kierunek: {{destination.label}}</p>
            <div class="flex flex-row w-full flex-wrap gap-2 justify-center">
              <div class="p-1 border-2 border-blue" v-for="connection in destination.connections">
                {{connection.departure.hour}}:{{connection.departure.minute}}
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>

</style>
