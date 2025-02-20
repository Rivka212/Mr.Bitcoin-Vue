
<script>
import { userService } from "@/services/user.service";
import { bitcoinService } from "@/services/bitcoin.service";
  import { Bar, Line, Pie } from 'vue-chartjs'

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
  PointElement,
  LineElement,
  ArcElement
  } from 'chart.js'

  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend ,PointElement,ArcElement,
  LineElement,)
  
  export default {
    props:{
      data:Object,
      options:Object,
      // type: String,
    },
    components: {
      Bar,
      Line,
      Pie
    },
  }
  </script>
   
<template>
 <div class="chart">
  <!-- <div class="chart" v-if="chartData && chartData.labels && chartData.labels.length > 0 && chartData.datasets && chartData.datasets[0]"> -->

    <Bar :data="data" :options="options" />
    <!-- <Bar  :data="{ labels: chartData.labels, datasets: [chartData.datasets[0]] }" :options="options" /> -->
  </div>
  <div class="chart">
    <Pie :data="data" :options="options" />
  </div>
  <div class="chart">
    <Line  :data="data" :options="options" />
  </div>
  <!-- v-if="type === 'bar'" -->
  </template>
  <style scoped>
  .chart{
margin-bottom: 50px;
height: 200px;
  }
</style>