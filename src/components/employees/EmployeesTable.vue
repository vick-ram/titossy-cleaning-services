<template>
  <div class="q-py-md">
    <q-table
      title="Employees"
      :rows="row"
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
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            flat
            dense
            square
            class="no-caps underline-text"
            label="Edit"
            @click="openEditDialog(props.row)"
          />
        </q-td>
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
import { ref, onMounted, watch } from "vue";
import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "boot/firebase";
import columns from "./columns.json";

const filter = ref("");
const row = ref([]);

// Deletes an employee from the database
const deleteRow = async (id) => {
  const index = row.value.findIndex((row) => row.id === id);
  if (index !== -1) {
    row.value.splice(index, 1);
  }
  await deleteDoc(doc(db, "employees", id));
};

watch(
  row,
  async (newData) => {
    for (const updatedRow of newData) {
      const { id, ...data } = updatedRow;
      await updateDoc(doc(db, "employees", id), data);
    }
  },
  { deep: true }
);

const toggleStatus = async (row) => {
  row.status = row.status === "Approved" ? "Pending" : "Approved";
  await updateDoc(doc(db, "employees", row.id), { status: row.status });
};
// onMounted(async () => {
//   const unsubscribe = onSnapshot(collection(db, "employees"), (snapshot) => {
//     snapshot.forEach((doc) => {
//       row.value.push({ id: doc.id, ...doc.data() });
//     });
//   });
//   return unsubscribe;
// });

onMounted(async () => {
  const unsubscribe = onSnapshot(collection(db, "employees"), (snapshot) => {
    let index = 1; // Initialize index counter
    row.value = []; // Clear row.value
    snapshot.forEach((doc) => {
      const data = { id: doc.id, index: index, ...doc.data() }; // Assign index to 'index' field
      row.value.push(data);
      index++; // Increment index counter
    });
  });
  return unsubscribe;
});
</script>

<style scoped>
.first-column {
  border-right: 1px solid #aaa0a0; /* Change color as needed */
}
</style>
