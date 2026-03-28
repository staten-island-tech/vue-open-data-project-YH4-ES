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
import { onMounted } from 'vue'

console.log("MOUNTED")

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

let values

export default {
  props: {
    dataset: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.dataset.xValue)
    values = props.dataset
  },
  name: 'BarChart',
  components: { Bar },

  data() {
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
}
</script>