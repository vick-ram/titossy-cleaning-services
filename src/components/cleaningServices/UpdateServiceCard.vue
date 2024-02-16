<template>
  <q-layout>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      title="Services"
      :filter="filter"
    >
      <template #top-right>
        <q-btn
          icon="add"
          label="Add"
          color="secondary"
          class="q-mr-md"
          style="text-transform: capitalize"
          @click="openDialog = true"
        />
        <q-input v-model="filter" label="Search" outlined dense />
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td :key="index" :props="props">
            {{ props.row.index }}
          </q-td>
          <q-td :key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td :key="image" :props="props">
            <q-img
              :src="props.row.image"
              :ratio="16 / 9"
              spinner-color="primary"
              spinner-size="82px"
              style="width: 100px; height: 100px; object-fit: cover"
            />
          </q-td>
          <q-td :key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td :key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td :key="category" :props="props">
            {{ props.row.category }}
          </q-td>
          <q-td :key="rating" :props="props">
            {{ props.row.rating }}
          </q-td>
          <q-td :key="status" :props="props">
            {{ props.row.status }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="q-gutter-md">
      <q-dialog v-model="openDialog">
        <q-card class="q-pa-md" style="min-width: 450px">
          <q-card-actions align="right">
            <q-btn round icon="cancel" v-close-popup dense />
          </q-card-actions>
          <q-card-section class="q-gutter-md">
            <h6>Add service</h6>
            <q-input
              v-model="service.name"
              label="Service Name"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="service.price"
              label="Price"
              type="number"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="service.category"
              label="Category"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="service.description"
              label="Description"
              type="textarea"
              outlined
              class="q-mb-md"
            />
            <q-file
              filled
              v-model="service.image"
              @update:model-value="serviceStore.onFileChange"
              label="Service Image"
              class="q-mb-md"
              accept="image/*"
              max-files="3"
              multiple
            >
              <template #prepend>
                <q-icon name="image" />
              </template>
            </q-file>
            <q-btn
              label="Add"
              class="no-caps full-width q-pa-sm q-mb-md"
              color="primary"
              :loading="loading"
              @click="addService"
            >
              <template #loading>
                <q-spinner-ios />
              </template>
            </q-btn>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import columns from "./columns.json";
import { useServiceStore } from "src/stores/serviceStore";
import { db } from "src/boot/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const serviceStore = useServiceStore();
const rows = ref([]);
const filter = ref("");
const openDialog = ref(false);
const service = ref({
  name: "",
  image: null,
  description: "",
  price: 0,
  category: "",
  rating: 0,
  status: "pending",
});
const loading = ref(false);

const addService = async () => {
  await serviceStore.addService(service.value);
  openDialog.value = false;
};

onMounted(async () => {
  const unsubscribe = onSnapshot(collection(db, "services"), (snapshot) => {
    let index = 1;
    rows.value = [];
    snapshot.forEach((doc) => {
      const data = { id: doc.id, index: index, ...doc.data() };
      rows.value.push(data);
      index++;
    });
  });
  return unsubscribe;
});
</script>
