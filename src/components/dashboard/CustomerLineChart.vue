<template>
  <div class="q-pa-md col-4">
    <q-responsive :ratio="16 / 9">
      <q-card>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 text-overline text-grey-6">CUSTOMERS</div>
            <div class="text-h6 text-overline q-mb-md">200</div>
            <div class="row justify-start content-center">
              <q-icon name="arrow_upward" class="q-pr-sm" />
              <p class="text-blue-5 q-pr-sm">3.48%</p>
              <p>since last month</p>
            </div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img src="../../assets/customer.png" :ratio="16 / 9" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-responsive>
  </div>

  <div class="q-pa-md col-4">
    <q-responsive :ratio="16 / 9">
      <q-card>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 text-overline text-grey-6">BOOKINGS</div>
            <div class="text-h6 text-overline q-mb-md">40</div>
            <div class="row justify-start content-center">
              <q-icon name="menu" class="q-pr-sm" />
              <p class="text-blue-5 q-pr-sm">4.02%</p>
              <p>since last month</p>
            </div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img src="../../assets/reservation.png" :ratio="16 / 9" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-responsive>
  </div>

  <div class="q-pa-md col-4">
    <q-responsive :ratio="16 / 9">
      <q-card>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 text-overline text-grey-6">REVENUE</div>
            <div class="text-h6 text-overline q-mb-md">KSHS.12,000</div>
            <div class="row justify-start content-center">
              <q-icon name="arrow_downward" class="q-pr-sm" />
              <p class="text-blue-5 q-pr-sm">-0.38%</p>
              <p>since last month</p>
            </div>
          </q-card-section>
          <q-card-section class="col-5 flex flex-center">
            <q-img src="../../assets/revenue.png" :ratio="16 / 9" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </q-responsive>
  </div>
  <!-- <div class="q-pa-md col-8">
    <apexchart
      type="line"
      :options="chartOptions"
      :series="chartSeries"
      :width="'100%'"
    />
  </div>
  <div class="q-pa-md col-4">
    <apexchart
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
      :width="'100%'"
    />
  </div> -->
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
