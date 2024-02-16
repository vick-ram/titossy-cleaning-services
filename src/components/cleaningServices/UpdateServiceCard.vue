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
              v-model="image"
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
import { ref } from "vue";
import columns from "./columns.json";

const rows = ref([]);
const filter = ref("");
const openDialog = ref(false);
const service = ref({});
const image = ref(null);
const loading = ref(false);
const addService = () => {
  loading.value = true;
  rows.value.push(service.value);
  setTimeout(() => {
    loading.value = false;
  }, 2000);
  openDialog.value = false;
};
</script>
