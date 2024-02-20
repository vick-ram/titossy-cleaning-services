<template>
  <div>
    <q-table
      title="Customers"
      :rows="row"
      :dense="$q.screen.lt.md"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template #top-right>
        <q-btn
          color="primary"
          dense
          icon="add"
          label="customer"
          @click="open = true"
          class="q-mr-lg q-pa-sm"
        />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td :key="'index'" :props="props">
            {{ props.row.index }}
          </q-td>
          <q-td :key="'firstName'" :props="props">
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
          <q-td :key="'lastName'" :props="props">
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
          <q-td :key="'gender'" :props="props">
            {{ props.row.gender }}
            <q-popup-edit
              v-model="props.row.gender"
              title="edit gender"
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
          <q-td :key="'email'" :props="props">
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
          <q-td :key="'phone'" :props="props">
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
          <q-td :key="'address'" :props="props">
            {{ props.row.address }}
            <q-popup-edit
              v-model="props.row.address"
              title="edit address"
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
          <q-td :key="'status'" :props="props">
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
          <q-td :key="'actions'" :props="props">
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
    <q-dialog v-model="open">
      <q-card class="q-pa-md" style="min-width: 200px">
        <q-card-section class="q-gutter-md">
          <q-input
            v-model="customer.firstName"
            outlined
            label="First Name"
            dense
            autofocus
          />
          <q-input
            v-model="customer.lastName"
            outlined
            label="Last Name"
            dense
            autofocus
          />
          <q-input
            v-model="customer.gender"
            outlined
            label=" Gender"
            dense
            autofocus
            type="text"
          />
          <q-input
            v-model="customer.email"
            outlined
            label="Email"
            dense
            autofocus
            type="email"
          />
          <q-input
            v-model="customer.password"
            outlined
            label="Password"
            type="password"
            dense
            autofocus
          />
          <q-input
            v-model="customer.phone"
            outlined
            label="Phone"
            dense
            autofocus
            type="number"
          />
          <q-input
            v-model="customer.address"
            outlined
            label="Address"
            dense
            autofocus
            type="address"
          />
          <q-btn
            color="primary"
            label="Add"
            :loading="loading"
            @click="addCustomer"
          >
            <template #loading>
              <q-spinner-ios />
            </template>
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import columns from "./columns.json";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "boot/firebase";
import { useQuasar } from "quasar";
import {
  collection,
  setDoc,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const filter = ref("");
const row = ref([]);
const open = ref(false);
const loading = ref(false);
const customer = ref({
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  createdAt: null,
  status: "Pending",
});

const $q = useQuasar();
const addCustomer = async () => {
  loading.value = true;
  const credentials = await createUserWithEmailAndPassword(
    auth,
    customer.value.email,
    customer.value.password
  );
  const docRef = await setDoc(
    doc(db, "customer", credentials.user.uid),
    customer.value
  );
  console.log("Document written with ID: ", docRef);
  $q.notify({
    message: `Customer added successfully`,
    color: "positive",
    position: "top",
  });
  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 1000);
};
watch(
  row,
  async (newData) => {
    for (const updatedRow of newData) {
      const { id, ...data } = updatedRow;
      await updateDoc(doc(db, "customer", id), data);
    }
  },
  { deep: true }
);

const toggleStatus = async (row) => {
  row.status = row.status === "Approved" ? "Pending" : "Approved";
  await updateDoc(doc(db, "customer", row.id), { status: row.status });
};

onMounted(async () => {
  const unsubscribe = onSnapshot(collection(db, "customer"), (snapshot) => {
    let index = 1;
    row.value = [];
    snapshot.forEach((doc) => {
      const data = { id: doc.id, index: index, ...doc.data() };
      row.value.push(data);
      index++;
    });
    console.log(row.value);
  });
  return unsubscribe;
});

// Deletes an employee from the database
const deleteRow = async (id) => {
  const index = row.value.findIndex((row) => row.id === id);
  if (index !== -1) {
    row.value.splice(index, 1);
  }
  await deleteDoc(doc(db, "customer", id));
};
</script>
