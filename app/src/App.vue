<template>
  <h1>The homeless infoer: Just a really depressing website</h1>
  <div id="dropdown">Dropdown
    <!-- put template here with v-for -->
  </div>
  <div style="width: 50%;">
    <canvas id="acquisitions" ref="canvas">

    </canvas>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Chart from 'chart.js/auto'
const homelessData = ref()

async function getHomeless() {
  try {
    const response = await fetch(`https://data.cityofnewyork.us/resource/5e9h-x6ak.json`)
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
        labels: homelessData.value.map(row => row.report_date),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: homelessData.value.map(row => row.fwc_avg_daily_census)
          }
        ]
      }
    }
  );
}

onMounted( async () => getHomeless())



</script>

<style lang="css" scoped>
:global(html) {
  font-family: Consolas, monaco, monospace;
}
</style>