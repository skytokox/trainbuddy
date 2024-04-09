<script setup>
import {computed, onMounted, ref} from "vue";
import {createDirectus, rest, readItems, readItem, authentication, login, createItem} from '@directus/sdk';
import BusStop from "@/components/BusStop.vue";
const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication('json'));
const bus_lines = ref([])

async function putData() {
  //static token - 23PpxRTPSoaBzaGp1ZL5norJbMCYh17W
  try {
    await client.login("server@example.com", "password")
    const obj = {
      "line_id": '23',
      "stops": JSON.stringify([
        {"name": "Kraków", "hours": ["8:00", "10:00", "12:00"]},
        {"name": "Katowice", "hours": ["9:30", "11:30", "13:30"]},
        {"name": "Bielsko-Biała", "hours": ["11:00", "13:00", "15:00"]},
      ])
    }
    const result = await client.request(createItem('bus_lines', obj))
  } catch (error) {
    console.log(error)
  }
}
async function fetchData() {
  const result = await client.request(readItems('bus_lines'));
  let temp = []
  result.forEach((item) => temp.push({"id": item.id, "line_id": item.line_id, "stops": JSON.parse(item.stops)}))
  bus_lines.value = temp
  // putData()
}


const selected_line_id = ref('');
const selected_line = computed(() => {
  return bus_lines.value.filter((l) => l.line_id === selected_line_id.value)
})

onMounted(() => {
  fetchData()
})
</script>

<template>
  <select v-model="selected_line_id">
    <option disabled value="">Wybierz linie</option>
    <option v-for="line in bus_lines" :value="line.line_id">
      Linia {{line.line_id}}
    </option>
  </select>
  <BusStop :lines="selected_line"/>
  <Checkbox v-model="checked" :binary="true" />
</template>

<style scoped>

</style>
