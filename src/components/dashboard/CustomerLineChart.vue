<template>
  <div class="col-2">
    <apexchart
      type="line"
      :options="chartOptions"
      :series="chartSeries"
      :width="'30%'"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const chartOptions = ref({
  chart: {
    id: "customer-line-chart",
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  title: {
    text: "Customer Orders",
    align: "left",
  },
  dataLabels: {
    enabled: false,
  },
  toolbar: {
    show: false,
  },
});
const chartSeries = ref([
  {
    name: "Customer 1",
    data: [30, 40, 35, 50, 49, 60],
  },
  {
    name: "Customer 2",
    data: [45, 35, 50, 58, 42, 55],
  },
]);
</script>

<style scoped>
/* Add custom styles for the chart component */
</style>
