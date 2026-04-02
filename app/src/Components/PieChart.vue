<template>
    <Pie
        :chart-options="chartOptions"
        :data="chartData"
        id="chart"
    />
</template>

<script>

import { Pie } from 'vue-chartjs';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: {
    Pie
  },
  props: {
    dataset: {
      type: Object,
      required: true
    }
  },
  setup() {

  },
  computed: {
  chartData() {
    return {
      labels: this.dataset.xValue,
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
          data: this.dataset.yValue
        }
      ]
    }
  },
  chartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false
    }
  }
}
  }
</script>

<style lang="scss" scoped>

</style>