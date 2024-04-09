<script setup>
  const props = defineProps({
    connections: Array
  })
  console.log(props.item)
</script>

<template>
  <div v-for="connection in connections">
    <div>Linia {{connection.id}}</div>
    <div>
      <h3>Przystanki</h3>
      <ul>
        <li v-for="stop in connection.stops">
          <span>{{stop.station_name}}</span> -
          <span v-if="stop.status === 'first'"><b>START</b> - </span>
          <span v-else>Godzina przyjazdu: {{stop.arrival.hour}}:{{stop.arrival.minute < 10 ? "0" + stop.arrival.minute : stop.arrival.minute}} - </span>
          <span v-if="connection.end_date.minutes === stop.arrival.minute"><b>KONIEC</b></span>
          <span v-else-if="stop.arrival.minute === stop.departure.minute && stop.status !== 'first'">Przesiadka</span>
          <span v-else>Godzina odjazdu: {{stop.departure.hour}}:{{stop.departure.minute < 10 ? "0" + stop.departure.minute : stop.departure.minute}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

ul {
  list-style: none;
}
li:first-child:before {
  top: 15px;
}
li:last-child:before {
  height: 15px;
  top: -13px;
}
li::after {
  content: '';
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2016%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8%204q.55%200%201.063.145a3.94%203.94%200%200%201%201.762%201.031%203.94%203.94%200%200%201%201.03%201.762Q12%207.448%2012%208q0%20.55-.145%201.063a3.94%203.94%200%200%201-1.03%201.765%204%204%200%200%201-1.762%201.031Q8.55%2012%208%2012c-.55%200-.721-.047-1.063-.14a4.06%204.06%200%200%201-1.765-1.032A4.06%204.06%200%200%201%204.14%209.062%204%204%200%200%201%204%208q0-.55.14-1.063a4%204%200%200%201%20.407-.953A4.1%204.1%200%200%201%205.98%204.546a4%204%200%200%201%20.957-.401A4%204%200%200%201%208%204%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-size: contain;
  left: 0;
  top: 2px;
  width: 12px;
  height: 12px;
}
li:first-child::after, li:last-child::after {
  content: '';
  width: 16px;
  height: 16px;
  left: -2px;
  top: 0;
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2216%22%20cy%3D%2216%22%20r%3D%226%22%2F%3E%3Cpath%20d%3D%22M16%2030a14%2014%200%201%201%2014-14%2014.016%2014.016%200%200%201-14%2014m0-26a12%2012%200%201%200%2012%2012A12.014%2012.014%200%200%200%2016%204%22%2F%3E%3Cpath%20data-name%3D%22%26lt%3BTransparent%20Rectangle%26gt%3B%22%20style%3D%22fill%3Anone%22%20d%3D%22M0%200h32v32H0z%22%2F%3E%3C%2Fsvg%3E");
}
li {
  position: relative;
  margin: 0;
  padding-bottom: 1em;
  padding-left: 20px;
}
li:before {
  background-color: #000;
  width: 2px;
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 5px;
}
</style>