<template>
    <h1>Click on a graph to get an entire page of nothing but data.</h1>
    <h2>Set different keys from the homeless database using the dropoptions</h2>
  <div class="dropdown" v-if="loaded[`bar1`]">
    <DropOption 
      id="DropOption" 
      v-for="(value, key) in dropOptions[`bar1`][`X`]"
      v-show="value || openedOptions[`bar1`][`X`]",
      :option="key"
      @click="clickOption(key, value, `bar1`, `X`)"
    />
  </div>
  <div class="dropdown" v-if="loaded[`bar1`]">
    <DropOption 
      id="DropOption" 
      v-for="(value, key) in dropOptions[`bar1`][`Y`]" 
      v-show="value || openedOptions[`bar1`][`Y`]" 
      :option="key" 
      @click="clickOption(key, value, `bar1`, `Y`)"
    />
  </div>
  
  <div style="width: 50%;">
    <BarChart 
      v-if="loaded[`bar1`]" 
      :key="homelessData[`bar1`]" 
      :dataset="homelessData[`bar1`]"
      @click="showDataOnClick(homelessData[`bar1`])"
    />
  </div>
  <div class="dropdown" id="dropdownContainer" v-if="loaded[`pie1`]">
    <DropOption 
      id="DropOption" 
      v-for="(value, key) in dropOptions[`pie1`][`X`]"
      v-show="value || openedOptions[`pie1`][`X`]",
      :option="key"
      @click="clickOption(key, value, `pie1`, `X`)"
    />
  </div>
  <div class="dropdown" v-if="loaded[`pie1`]">
    <DropOption 
      id="DropOption" 
      v-for="(value, key) in dropOptions[`pie1`][`Y`]" 
      v-show="value || openedOptions[`pie1`][`Y`]" 
      :option="key" 
      @click="clickOption(key, value, `pie1`, `Y`)"
    />
  </div>
  
  <PieChart v-if="loaded[`pie1`]" 
      :key="homelessData[`pie1`]" 
      :dataset="homelessData[`pie1`]"
      @click="showDataOnClick(homelessData[`pie1`])"
  />
 
</template>

<script setup>

import {onBeforeMount, onMounted, ref} from "vue";
import BarChart from "@/Components/BarChart.vue";
import DropOption from "@/Components/DropOption.vue";
import PieChart from "@/Components/PieChart.vue";
import { shownExpandData } from "@/store";
import { useRouter } from 'vue-router'

const router = useRouter()

const loaded = ref({})
const homelessData = ref({})
const dropOptions = ref({})
var dataset
const openedOptions = ref({
  ["bar1"] : {},
  ["pie1"] : {},
})

function setDropdown (sample) {
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

async function getHomeless(dataset) {
  try {
    const response = await fetch(dataset)
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

function setChart (dataset, xName, yName, chart) {
  
  let xValue
  let yValue

  homelessData.value[chart] = homelessData.value[chart] || {}
  if (xName !== "N/A") {
    xValue = getKeyValues(dataset, xName)
    homelessData.value[chart].xValue = xValue
  }
  if (yName !== "N/A") {
    yValue = getKeyValues(dataset, yName)
    homelessData.value[chart].yValue = yValue
  }
  loaded.value[chart] = true
  console.log(homelessData.value[chart])
}

async function setData (url, xName, yName, chart) {
  dataset = await getHomeless(url)

  if (dropOptions.value[chart] == undefined){
    dropOptions.value[chart] = {}
  }
  dropOptions.value[chart][`X`] = setDropdown(dataset[0])
  dropOptions.value[chart][`X`][xName] = true
  dropOptions.value[chart][`Y`] = setDropdown(dataset[0])
  dropOptions.value[chart][`Y`][yName] = true

  setChart(dataset, xName, yName, chart)
  
}


onBeforeMount(async ()=>{
  setData (`https://data.cityofnewyork.us/resource/5e9h-x6ak.json`, "report_date", "fwc_avg_daily_census", "bar1", "RESET")
  setData (`https://data.cityofnewyork.us/resource/5e9h-x6ak.json`, "report_date", "fwc_avg_daily_census", "pie1", "RESET")
})

function clickOption (key, value, chart, plane) {
  if (!loaded.value[chart]) {
    setData (`https://data.cityofnewyork.us/resource/5e9h-x6ak.json`, "report_date", "fwc_avg_daily_census", chart, "RESET")
  }

  if (dropOptions.value[chart][plane][key] == false) {
    for (let option in dropOptions.value[chart][plane]) {
      dropOptions.value[chart][plane][option] = false
    }
    dropOptions.value[chart][plane][key] = true

    console.log(plane)
    if (plane == "Y") {
      setChart(dataset, "N/A", key, chart)
    }
    if (plane == "X") {
      setChart(dataset, key, "N/A", chart)
    }

    openedOptions.value[chart][plane] = false //Closing the dropdown
  } else {
    openedOptions.value[chart][plane] = !openedOptions.value[chart][plane]
  }
}

function showDataOnClick (dataset) {
  shownExpandData.value = dataset
  router.push('/DataSheet')
}

</script>

<style lang="css" scoped>

.dropdown{
  background-color: aliceblue;
  width: fit-content;
  text-align: center;
  margin: 0 20px;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
}

</style>