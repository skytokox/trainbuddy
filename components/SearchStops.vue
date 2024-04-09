<script setup lang="ts">
import debounce from "lodash.debounce";

const originStation = defineModel()
const destinationStation = ref([])
const originStations = ref({})
let timer : any

async function getOriginStations() {

  const { data } = await useFetch(`/api/getStations?originStation=${originStation.value}`)
  originStations.value = data
}

const debouncedWatch = debounce(async () => {
  await getOriginStations()
}, 500);
watch(originStation, debouncedWatch);

</script>

<template>
  <RouterLink to="/test">Kolejna</RouterLink> <br/>
  <input v-model="originStation"/> <br/>
  <div v-if="originStations.value != null && originStation.length > 0">
    <ul>
      <li v-for="station in originStations.value.stations">
        {{station.name}}
      </li>
    </ul>
  </div>
  <div v-else>Nie ma takiej stacji</div>
</template>

<style scoped>

</style>