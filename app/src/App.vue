<template>
  <h1>The homeless infoer: Just a really depressing website</h1>
  <div id="dropdown">Dropdown
  </div>
  <div style="width: 1000px;">
    <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

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
}

getHomeless("report_date", "fwc_avg_daily_census", `https://data.cityofnewyork.us/resource/5e9h-x6ak.json`)
console.log(homelessData.value)

export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: "fwc_avg_daily_census",
          datasets: homelessData.value.map(row => row["fwc_avg_daily_census"])
        },
        chartOptions: {
          responsive: true
        }
      }
    }
  }


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