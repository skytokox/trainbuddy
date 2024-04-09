<script setup lang="ts">
const loading = ref(false)
const selected = ref()
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

</script>

<template>
  <div class="mx-auto w-1/2 text-center min-h-screen min-w-full">
    <div class="py-8">
      <p class="text-5xl text-black">Welcome</p>
      <p class="text-black">Search your train station</p>
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
    </div>
    <pre>
      {{selected}}
    </pre>
  </div>
</template>

<style scoped>

</style>
