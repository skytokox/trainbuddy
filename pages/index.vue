<script setup lang="ts">
const loading = ref(false)
const selected = ref()
const destinations = ref([])
const forceRender = ref(0)
const dateNow = ref()
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
  dateNow.value = Date.now()
  console.log(destinations.value)
}

function scrollInto(id: string) {
  const element = document.getElementById(id)
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

</script>

<template>
  <div class="mx-auto w-1/2 text-center min-w-full">
    <div class="py-8">
      <p class="text-5xl dark:text-gray-200">Sprawdź odjazdy</p>
      <p class="dark:text-gray-200 py-2">Proszę wpisać stacje</p>
    </div>
    <div class="mx-auto min-h-12 max-w-screen-sm flex flex-col gap-4 items-center">
          <UInputMenu
              v-model="selected"
              :search="search"
              :loading="loading"
              placeholder="Search for a station"
              option-attribute="name"
              trailing
              by="id"
              class="w-1/2"
              @submit="getDepartures"
          />
      <UButton
          icon="i-heroicons-magnifying-glass"
          size="sm"
          color="gray"
          variant="solid"
          label="Sprawdź stacje"
          :trailing="true"
          @click="getDepartures"
      />
    </div>
    <div class="w-3/4 mx-auto mt-4">
        <div class="flex flex-row w-full flex-wrap gap-2 justify-center">
          <UButton v-for="destination in destinations"
                   color="white" class="p-1 border-2 border-blue-300 text-sm dark:border-blue-800"
                   @click="scrollInto(destination.slug_name)">
            {{destination.label}}
          </UButton>
        </div>
        <div class="flex flex-col w-full mx-auto my-4 gap-2 " >
          <div class="border-2 border-gray-200 rounded-lg p-2 dark:border-gray-700" v-for="destination in destinations">
            <div class="invisible absolute -mt-64" v-bind:id="destination.slug_name"></div>
            <p class="text-left">Kierunek: {{destination.label}}</p>
            <div class="flex flex-row w-full flex-wrap gap-2 justify-start my-2">
              <div  v-for="connection in destination.connections">
                <UTooltip>
                  <template #text>
                    {{connection.train_brand.display_name}} {{connection.train}}
                  </template>
                <div v-if="dateNow < Date.parse(connection.departure.full)" class="border-2 rounded-md border-green-300 p-1 text-sm dark:border-green-800">
                  {{connection.departure.hour}}:{{connection.departure.minute}}
                </div>
                <div v-else class="border-2 rounded-md border-red-300 p-1 text-sm dark:border-red-800">
                  {{connection.departure.hour}}:{{connection.departure.minute}}
                </div>
                </UTooltip>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<style scoped>

</style>
