<template>
  <Bar
    id="chart"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { watch, ref, onMounted } from 'vue'
import PieChart from './PieChart.vue'

console.log("MOUNTED")

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    dataset: {
      type: Object,
      required: true
    }
  },
  
  computed: {
    chartData () {
      return {
        labels: this.dataset.xValue,
        datasets: [
        {
          label: "I really don't wanna pass in a third variable for this",
          backgroundColor: '#163d78',
          data: this.dataset.yValue
        }
        ]
      }
    }
  },
  /*data() {
    return {
      chartData: {
        labels: values.xValue,
        datasets: [ 
          {
            label: "Num of people",
            backgroundColor: '#163d78',
            data: values.yValue 
          }
        ]
      },
      chartOptions: {
        responsive: true
      },
    }
  }
  */
}
</script>