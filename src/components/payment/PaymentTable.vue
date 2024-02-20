<template>
  <div>
    <q-table
      title="Payments"
      :row="row"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template #top-right>
        <q-input
          v-model="filter"
          type="text"
          debounce="300"
          outlined
          placeholder="Search"
        />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import columns from "./columns.json";

const row = ref([]);
const filter = ref("");
</script>
