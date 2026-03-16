<template>
  <h1>The homeless infoer</h1>
  <div>
    <canvas id="acquisitions">

    </canvas>
  </div>
</template>

<script setup>
import {ref} from "vue";
import Chart from 'chart.js/auto'
const homelessData = ref()
async function getHomeless() {
  try {
    const response = await fetch(`https://data.cityofnewyork.us/resource/bmxf-3rd4.json`)
    const data = await response.json()
    console.log(data)
    homelessData.value = data
  } catch (error) {
    console.log(error)
  }
  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: homelessData.value.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            home: homelessData.value.map(row => row.count)
          }
        ]
      }
    }
  );
}

getHomeless()


</script>

<style lang="css" scoped>
:global(html) {
  font-family: Consolas, monaco, monospace;
}
</style>