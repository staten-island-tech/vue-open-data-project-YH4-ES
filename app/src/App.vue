<template>
  <div class="test"> <h1>The homeless infoer: Just a really depressing website</h1>
  <div id="dropdown">
    <DropOption v-if="loaded[`bar1`]" v-for="(values, key) in dropOptions" :key = "key" :option="key"/>
  </div>
  <div style="width: 50%;">
    <BarChart 
      v-if="loaded[`bar1`]" 
      :key="homelessData" 
      :dataset="homelessData[0].dataset"
    />
  </div></div>
 
</template>

<script setup>

import {onBeforeMount, onMounted, ref} from "vue";
import BarChart from "./Components/BarChart.vue";
import DropOption from "./Components/DropOption.vue";

const loaded = ref({})
const homelessData = ref([])
const dropOptions = ref({})

function setDropdown (sample, dropdownRoot) {
  let returnedData = {}
  for (let key in sample) {
    returnedData[key] = false
  }
  return returnedData
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
  
  async function getHomeless(dataset) {
    try {
      const response = await fetch(dataset)
      const data = await response.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }

  let data = await getHomeless(`https://data.cityofnewyork.us/resource/5e9h-x6ak.json`)

  let xValue = getKeyValues(data, "report_date")
  let yValue = getKeyValues(data, "fwc_avg_daily_census")
  
  console.log(data[0])
  dropOptions.value = setDropdown(data[0], dropOptions.value)
  console.log(dropOptions.value)
  
  homelessData.value.push( {dataset : {xValue, yValue}} )
  loaded.value[`bar1`] = true
})


</script>

<style lang="css" scoped>

#dropdown{
  background-color: aliceblue;
  width: 100px;
  text-align: center;
}
</style>