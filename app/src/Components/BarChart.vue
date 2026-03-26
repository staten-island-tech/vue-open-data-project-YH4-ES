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

/*const props = defineProps({
    dataset: {
        type: Object,
        required: true,
    }
})
console.log(props)*/

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  props: {
    dataset: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.dataset)
  },
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'January', 'February', 'March' ],
        datasets: [ { data: [40, 20, 12] }, {data: [5, 5, 5]} ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}
</script>