<script setup>
import {computed, onMounted, ref} from "vue";
import {createDirectus, rest, readItems, readItem, authentication, login, createItem} from '@directus/sdk';
import BusStop from "@/components/BusStop.vue";
const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication('json'));
const bus_origin_stop = ref('')
const bus_destination_stop = ref('')
const bus_lines = ref([])

function check(stops) {
  let isOriginStop = false
  let isDestinationStop = false
  let originIndex = 0;
  let destinationIndex = 0;
  stops.forEach((stop, index) => {
    if(stop.name === bus_origin_stop.value) {
      isOriginStop = true
      originIndex = index
    }else if(stop.name === bus_destination_stop.value) {
      isDestinationStop = true
      destinationIndex = index
    }
  })
  return isOriginStop && isDestinationStop && (destinationIndex > originIndex)
}

function slice_lines(lines) {
  const temp_lines = lines
  const result = JSON.parse(JSON.stringify(lines))
  temp_lines.forEach((line, index) => {
    let startIndex = 0
    let stopIndex = 0
    line.stops.forEach((stop, index) => {
      if(stop.name === bus_origin_stop.value) {
        startIndex = index
      }else if(stop.name === bus_destination_stop.value)  {
        stopIndex = index
      }
    })
    result[index].stops = line.stops.slice(startIndex, stopIndex + 1)
  })
  return result
}

const available_bus_lines = computed(() => {
  return slice_lines(bus_lines.value.filter((t) => check(t.stops)))
})


onMounted(async () => {
  const result = await client.request(readItems('bus_lines'));
  let temp = []
  result.forEach((item) => temp.push({"id": item.id, "line_id": item.line_id, "stops": JSON.parse(item.stops)}))
  bus_lines.value = temp
})

</script>

<template>
  <div>
    <label>Start of trip</label>
    <input v-model="bus_origin_stop">
  </div>
  <div>
    <label>End of trip</label>
    <input v-model="bus_destination_stop">
  </div>
  <div v-if="available_bus_lines.length > 0">
    <p>Znalaziono linie!</p>
    <div class="lines">
      <BusStop :lines="available_bus_lines"/>
    </div>
  </div>
  <div v-else-if="available_bus_lines.length > 0
  && bus_destination_stop.length > 0
  && bus_origin_stop.length > 0">
    Nie znaleziono linii :(
  </div>

</template>

<style scoped>
.lines {
  display: flex;
  flex-direction: row;
}
</style>