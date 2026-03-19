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
const dropOptions = ref({})
async function getHomeless(xValue, yValue, dataset) {
  try {
    var response = await fetch(dataset)
    var data = await response.json()
    console.log(data)
    homelessData.value = data
    for (let key in homelessData.value[1]) {
      dropOptions.value[key] = false
    }
    console.log(dropOptions)
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
#dropdown{
  background-color: aliceblue;
  width: 100px;
  text-align: center;
}
</style>