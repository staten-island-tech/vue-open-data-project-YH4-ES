<template>
  <h1>The homeless infoer: Just a really depressing website</h1>
  <div id="dropdown">Dropdown
  </div>
  <div style="width: 1000px;">
    <canvas id="acquisitions" ref="canvas">

    </canvas>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Chart from 'chart.js/auto'
const homelessData = ref()
const dropOptions = ref([

])

async function getHomeless(xValue, yValue, dataset) {
  try {
    const response = await fetch(dataset)
    const data = await response.json()
    console.log(data)
    homelessData.value = data
    console.log(homelessData.value[1])
    for (thing of homelessData.value[1]){
      console.log(thing)
    }
  } catch (error) {
    console.log(error)
  }
  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'bar',
      data: {
        labels: homelessData.value.map(row => row[xValue]),
        datasets: [
          {
            label: yValue,
            data: homelessData.value.map(row => row[yValue])
          }
        ]
      }
    }
  );
}

onMounted( async () => getHomeless("report_date", "fwc_avg_daily_census", `https://data.cityofnewyork.us/resource/5e9h-x6ak.json`))



</script>

<style lang="css" scoped>
:global(html) {
  font-family: Consolas, monaco, monospace;
}
</style>