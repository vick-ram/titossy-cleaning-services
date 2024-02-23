<template>
  <div class="q-pa-md q-mt-md">
    <q-table
      title="Suppliers"
      :rows="row2"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td key="index" :props="props" class="first-column">
            {{ props.row.index }}
          </q-td>
          <q-td key="firstName" :props="props">
            {{ props.row.firstName }}
            <q-popup-edit
              v-model="props.row.firstName"
              title="edit first name"
              auto-save
              v-slot="scope"
              buttons
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="lastName" :props="props">
            {{ props.row.lastName }}
            <q-popup-edit
              v-model="props.row.lastName"
              title="edit last name"
              auto-save
              v-slot="scope"
              buttons
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
            <q-popup-edit
              v-model="props.row.email"
              title="edit email"
              auto-save
              v-slot="scope"
              buttons
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="phone" :props="props">
            {{ props.row.phone }}
            <q-popup-edit
              v-model="props.row.phone"
              title="edit phone"
              auto-save
              v-slot="scope"
              buttons
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="role" :props="props">
            {{ props.row.role }}
            <q-popup-edit
              v-model="props.row.role"
              title="edit role"
              auto-save
              v-slot="scope"
              buttons
            >
              <q-input
                v-model="scope.value"
                dense
                autofocus
                counter
                @keyup.enter="scope.set"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="status" :props="props">
            <q-btn
              :color="props.row.status === 'Approved' ? 'green' : 'orange'"
              flat
              dense
              class="no-caps"
              square
              style="text-transform: capitalize"
              @click="toggleStatus(props.row)"
            >
              {{ props.row.status }}
            </q-btn>
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              color="negative"
              flat
              dense
              square
              class="no-caps"
              @click="deleteRow(props.row.id)"
            >
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import columns from "./columns.json";
import useEmployeeData from "app/public/fetchEmployees";

const { row2 } = useEmployeeData();
</script>
