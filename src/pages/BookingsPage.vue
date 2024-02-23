<template>
  <div class="q-pa-md q-mt-md">
    <q-table title="Bookings" :rows="row" :columns="columns" row-key="name" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import columns from "../components/bookings/columns.json";
import useBookingData from "app/public/fetchBookings";

const { row } = useBookingData();
</script>
