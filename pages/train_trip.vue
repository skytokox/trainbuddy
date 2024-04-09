<script setup lang="ts">
const loading = ref(false)
const selected = ref()

const originStation = ref()
const destinationStation = ref()
const connections = ref({})
const items = ref([])

async function search (q: string) {
  if(q.length == 0) {
    q = 'Warszawa'
  }
  loading.value = true
  console.log(q)
  const data: { stations: []} = await $fetch('/api/getStations', { params: { originStation: q } })
  loading.value = false
  return data.stations
}

async function getConnections() {
  if(originStation.value != null && destinationStation.value != null) {
    const { data } = await useFetch(`/api/getConnections?originStation=${originStation.value.name}&destinationStation=${destinationStation.value.name}`)
    connections.value = data
    let temp: { label: string; }[] = []
    data.value.forEach((connection) => {
      temp.push(
          {
            'label': `${connection.start_date.hour}-${connection.end_date.hour}`
          }
      )
    })
    items.value = temp
  }
}


</script>

<template>
  <div class="mx-auto w-1/2 text-center min-h-full min-w-full">
    <div class="py-8">
      <p class="text-5xl text-black">Welcome</p>
      <p class="text-black">Search your train station</p>
    </div>
    <div class="mx-auto min-h-12 max-w-screen-sm flex flex-col">
      <div class="">
        <UInputMenu
            v-model="originStation"
            :search="search"
            :loading="loading"
            placeholder="Search for a station"
            option-attribute="name"
            trailing
            by="id"
        />
      </div>
      <div class="">
        <UInputMenu
              v-model="destinationStation"
              :search="search"
              :loading="loading"
              placeholder="Search for a station"
              option-attribute="name"
              trailing
              by="id"
          />
      </div>
      <button @click="getConnections">Sprawdź</button>
      <div v-if="connections.value != null">
<!--        <TrainStop :connections="connections.value" />-->
<!--        <pre>{{connections}}</pre>-->
      </div>
<!--      <div class="w-full bg-amber-300 min-h-12 flex items-center gap-2">-->
<!--        <div>10-12</div>-->
<!--        <div>12-14</div>-->
<!--        <div>14-16</div>-->
<!--      </div>-->
      <UTabs :items="connections.value" class="w-full">
        <template #default="{ item, index, selected }">
          {{console.log(item)}}git
          <p>{{`${item.start_date.hour}:${item.end_date.minutes}-${item.end_date.hour}:${item.end_date.minutes}`}}</p>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<style scoped>

</style>