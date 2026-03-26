<template>
  <h1>The homeless infoer: Just a really depressing website</h1>
  <div id="dropdown">Dropdown
  </div>
  <div style="width: 1000px;">
    <BarChart :key="homelessData" :dataset="homelessData[0]"/>
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import BarChart from "./Components/BarChart.vue";

  function setDropdown (sample, dropdownRoot) {
    for (let key in sample) {
      dropdownRoot[key] = false
    }
    return dropdownRoot
  }

  function getKeyValues (dataset, key) {
    let returnedData = []
    console.log(dataset[0])
    dataset.forEach(data => {
      console.log(data)
      returnedData.push(data[key])
    })
    console.log(returnedData)
    return returnedData
  }
const homelessData = ref([])
onBeforeMount(async ()=>{
  const dropOptions = ref({})
  async function getHomeless(xValue, yValue, dataset) {
    try {
      const response = await fetch(dataset)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  let data = await getHomeless("report_date", "fwc_avg_daily_census", `https://data.cityofnewyork.us/resource/5e9h-x6ak.json`)
  console.log(data)
  dropOptions.value = setDropdown(data, dropOptions.value)
  data = getKeyValues(data, "report_date")
  
  homelessData.value.push( data)
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