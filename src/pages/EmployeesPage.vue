<template>
  <div class="q-pa-md">
    <div class="row items-start">
      <div class="text-h6">Employees</div>
      <q-space />
      <q-btn
        color="primary"
        label="Add Employee"
        icon="add"
        @click="icon = true"
      />

      <q-dialog v-model="icon">
        <div>
          <AddEmployeeCard @close="icon = false" />
        </div>
      </q-dialog>
    </div>
    <Suspense>
      <EmployeesTable />
      <template #fallback>
        <q-inner-loading showing color="primary" />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddEmployeeCard from "../../src/components/employees/AddEmployeeCard.vue";
import EmployeesTable from "../components/employees/EmployeesTable.vue";

const icon = ref(false);
</script>
