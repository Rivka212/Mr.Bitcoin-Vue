
<script>
import Chart from "@/cmps/Chart.vue"
import { bitcoinService } from "@/services/bitcoin.service";

export default {
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Trade Volume',
            },
          },
        },
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Trade Volume',
            backgroundColor: '#f87979', 
            data: [],
          },
          // {
          //   label: 'Pie Chart Volume',  
          //   backgroundColor: ['#FFB6C1', '#f87979', '#B0E0E6', '#98FB98', '#FFEB3B'], 
          //   data: [],
          // }
        ]
      },
      // chartType: 'bar',
    };
  },
  async created() {
    try {
      const tradeVolumeData = await bitcoinService.getTradeVolume();
      const recentData = tradeVolumeData.slice(-15);  
      const labels = recentData.map(item => item.name);
      const data = recentData.map(item => item.value);

      this.chartData.labels = labels || [];
      this.chartData.datasets[0].data = data || [];  
      this.chartData.datasets[1].data = data || [];

    } catch (error) {
      console.error('Error loading trade volume data:', error);
    }
  },
  components: {
    Chart,
  },
};

  </script>
   
<template>
    <section class="chart">
    <Chart v-if="chartData && chartData.datasets && chartData.labels.length > 0" :data="chartData" :options="options" :type="chartType" />
      <!-- :type="chartType" -->
 </section>
</template>
<style scoped>
.chart{
  margin: 40px;
}
</style>


  