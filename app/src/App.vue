<template>
  <h1>The homeless infoer: Just a really depressing website</h1>
  <div id="dropdown">Dropdown
  </div>
  <div style="width: 1000px;">
    <BarChart :dataset="homelessData"/>
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import BarChart from "./Components/BarChart.vue";
const homelessData = ref([])
onBeforeMount(()=>{
  const dropOptions = ref({})
  async function getHomeless(xValue, yValue, dataset) {
    try {
      const response = await fetch(dataset)
      const data = await response.json()
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  function setDropdown (sample, dropdownRoot) {
    for (let key in sample) {
      dropdownRoot[key] = false
    }
  }

  let data = getHomeless("report_date", "fwc_avg_daily_census", `https://data.cityofnewyork.us/resource/5e9h-x6ak.json`)
  setDropdown(data, dropOptions.value)
  homelessData.value.push( data)
  console.log(homelessData.value)
})
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