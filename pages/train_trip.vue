<script setup lang="ts">
import { format } from 'date-fns'
const date = ref(new Date())
const loading = ref(false)
const loadingConnections = ref(false)
const originStation = ref()
const destinationStation = ref()
const connections = ref({})
const items = ref([])
const directConnections = ref(false)
const forceRender = ref(0)
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
async function search (q: string) {
  if(q.length == 0) {
    q = 'Warszawa'
  }
  loading.value = true
  const data: { stations: []} = await $fetch('/api/getStations', { params: { originStation: q } })
  loading.value = false
  return data.stations
}

function reverseStations() {
  const temp = originStation.value
  originStation.value = destinationStation.value
  destinationStation.value = temp
  console.log(destinationStation.value, originStation.value)
}

async function getConnections() {
  if(originStation.value != null && destinationStation.value != null) {
    loadingConnections.value = true
    const { data } = await useFetch(`/api/getConnections?originStation=${originStation.value.name}
    &destinationStation=${destinationStation.value.name}&user_date=${new Date(date.value).toISOString()}`)
    connections.value = data
    let temp: {}[] = []
    data.value.forEach((connection) => {
      temp.push(
          {
            label: `${connection.start_date.hour}:${connection.start_date.minutes}-${connection.end_date.hour}:${connection.end_date.minutes}`,
            connection: connection
          }
      )
    })
    loadingConnections.value = false
    items.value = temp
    forceRender.value += 1
  }
}


</script>

<template>
  <div class="mx-auto text-center min-w-full">
    <div class="py-8">
      <p class="text-5xl dark:text-gray-200">Zaplanuj trasę</p>
      <p class="dark:text-gray-200 py-2">Proszę wpisać stacje początkową i stacje docelową</p>
    </div>
    <div class="mx-auto min-h-12 max-w-screen-sm flex flex-col gap-4">
      <div class="flex lg:flex-row flex-col w-full">
        <UInputMenu
            v-model="originStation"
            :search="search"
            :loading="loading"
            placeholder="Search for a station"
            option-attribute="name"
            trailing
            by="id"
            class="lg:ml-auto mx-auto"
        />
        <div v-if="isLargeScreen" class="mx-auto w-auto lg:mx-0 flex flex-row gap-1">
          <UButton tabindex="-1" @click="reverseStations" color="gray"
                   variant="solid" icon="i-heroicons-arrows-right-left" />
          <UPopover :popper="{ placement: 'bottom-start' }" >
            <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

            <template #panel="{ close }">
              <DatePicker v-model="date" is-required @close="close" />
            </template>
          </UPopover>
        </div>
        <div v-else class="mx-auto my-2 w-auto flex flex-row gap-1">
          <UButton tabindex="-1" @click="reverseStations" color="gray"
                   variant="solid" icon="i-heroicons-arrows-up-down" />
          <UPopover :popper="{ placement: 'bottom-start' }" >
            <UButton icon="i-heroicons-calendar-days-20-solid" :label="format(date, 'd MMM, yyy')" />

            <template #panel="{ close }">
              <DatePicker v-model="date" is-required @close="close" />
            </template>
          </UPopover>
        </div>
        <UInputMenu
            v-model="destinationStation"
            :search="search"
            :loading="loading"
            placeholder="Search for a station"
            option-attribute="name"
            trailing
            by="id"
            class="lg:mr-auto mx-auto"
        />
      </div>
      <div class="w-full">
        <UButton
            icon="i-heroicons-magnifying-glass"
            size="sm"
            color="gray"
            variant="solid"
            label="Sprawdź połączenia"
            :trailing="true"
            @click="getConnections"
        />
      </div>
      <div v-if="loadingConnections" class="w-1/2 mx-auto lg:w-full">
        <UProgress animation="swing" />
      </div>
      <div v-else>
      <div v-if="isLargeScreen">
        <UTabs v-if="items.length > 0" :items="items" class="w-3/4 lg:w-full" :default-index="0" :key="forceRender">
          <template #item="{ item }">
            <UCard>
              <template #header>
                <p>Połączenie: {{item.connection.id}}</p>
                <p>Ilość przesiadek: {{item.connection.train_ids.length - 1}}</p>
                <p>Ilość przystanków: {{item.connection.stops.length}}</p>
              </template>
              <div>
                <TrainStop :connection="item.connection"/>
              </div>
            </UCard>
          </template>
        </UTabs>
      </div>
      <div v-else>
        <UTabs v-if="items.length > 0" :items="items" class="w-full mb-12" :default-index="0" :key="forceRender"
        orientation="vertical"
        >
          <template #item="{ item }">
            <UCard>
              <template #header>
                <p>Połączenie: {{item.connection.id}}</p>
                <p>Ilość przesiadek: {{item.connection.train_ids.length - 1}}</p>
                <p>Ilość przystanków: {{item.connection.stops.length}}</p>
              </template>
              <div>
                <TrainStop :connection="item.connection"/>
              </div>
            </UCard>
          </template>
        </UTabs>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>