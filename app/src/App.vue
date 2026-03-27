<template>
  <div class="test"> <h1>The homeless infoer: Just a really depressing website</h1>
  <div id="dropdown">Dropdown
  </div>
  <div style="width: 1000px;">
    <BarChart v-if="loaded" :key="homelessData" :data="homelessData[0].dataset[0]"/>
  </div></div>
 
</template>

<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import BarChart from "./Components/BarChart.vue";
var loaded = false
const homelessData = ref([])
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
    returnedData.push(data[key])
  })
  return returnedData
}


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

  dropOptions.value = setDropdown(data, dropOptions.value)
  let xValue = getKeyValues(data, "report_date")
  let yValue = getKeyValues(data, "fwc_avg_daily_census")
  
  
  homelessData.value.push( {dataset : {xValue, yValue}} )
  console.log(homelessData.value[0].dataset)
  loaded = true
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