<template>
  <h1>the website for if you really hate the homeless</h1>
  <div>

  </div>
</template>

<script setup>
import {ref} from "vue";
const homelessData = ref([])
async function getHomeless() {
  try {
    const response = await fetch(`https://data.cityofnewyork.us/api/v3/views/bmxf-3rd4/query.json`)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="css" scoped>

</style>