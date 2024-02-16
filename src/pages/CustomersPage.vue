<template>
  <div class="q-pa-md flex">
    <div class="row justify-between full-width">
      <div class="col-4">
        <div class="text-h5">Customers</div>
      </div>
      <q-space />
      <q-input
        class="col-4"
        outlined
        dense
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <q-table
      :rows="rows"
      :columns="columns"
      :filter="filter"
      title="Customers"
      row-key="name"
      class="q-py-md q-mt-md full-width"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          label="Add Customer"
          icon="add"
          @click="addCustomer"
        />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const filter = ref("");
const columns = [
  {
    name: "name",
    label: "Name",
    align: "center",
    field: (row) => `${row.name}`,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "center",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    label: "Phone",
    align: "center",
    field: "phone",
    sortable: true,
  },
  {
    name: "address",
    label: "Address",
    align: "center",
    field: "address",
    sortable: true,
  },
  {
    name: "city",
    label: "City",
    align: "center",
    field: "city",
    sortable: true,
  },
  {
    name: "state",
    label: "State",
    align: "center",
    field: "state",
    sortable: true,
  },
  { name: "zip", label: "Zip", align: "center", field: "zip", sortable: true },
  {
    name: "country",
    label: "Country",
    align: "center",
    field: "country",
    sortable: true,
  },
  { name: "actions", label: "Actions", align: "center", sortable: true },
];

const rows = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "987-654-3210",
    address: "456 Elm St",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    country: "USA",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "555-123-4567",
    address: "789 Oak St",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    country: "USA",
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "111-222-3333",
    address: "321 Pine St",
    city: "San Francisco",
    state: "CA",
    zip: "94101",
    country: "USA",
  },
]);
</script>
