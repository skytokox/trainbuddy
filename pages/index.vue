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
<!--    <pre>-->
<!--      {{departures}}-->
<!--    </pre>-->
    <div>
<!--      <div v-for="destination in destinations">-->
<!--        {{destination.display_name}}-->
<!--        <ul>-->
<!--          <li v-for="connection in destination.connections">-->
<!--            Pociąg {{connection.train}} odjeżdza o godzinie {{`${connection.departure.hour}:${connection.departure.minute}`}}-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
      <UTabs v-if="destinations.length > 0" :items="destinations" class="w-1/2 mx-auto" :default-index="0" :key="forceRender">
        <template #item="{ item }">
          <UCard  orientation="vertical" :ui="{ wrapper: 'flex items-center gap-4', list: { width: 'w-48' } }">
<!--            <template #header>-->
<!--              <p>Połączenie: {{item.connection.id}}</p>-->
<!--              <p>Ilość przesiadek: {{item.connection.train_ids.length - 1}}</p>-->
<!--              <p>Ilość przystanków: {{item.connection.stops.length}}</p>-->
<!--            </template>-->
<!--            <div>-->
<!--              <TrainStop :connection="item.connection"/>-->
<!--            </div>-->
            <div>
              {{item}}
            </div>
          </UCard>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style scoped>

</style>
