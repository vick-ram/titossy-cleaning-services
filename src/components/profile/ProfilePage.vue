<template>
  <div>
    <q-card class="my-card bordered flat">
      <q-card-section class="q-gutter-md">
        <div class="text-h5" align="text-center">Admin Profile</div>
        <q-input
          v-model="admin.firstName"
          type="text"
          filled
          label="First Name"
        />
        <q-input
          v-model="admin.lastName"
          type="text"
          filled
          label="Last Name"
        />
        <q-input
          v-model="admin.email"
          type="text"
          filled
          label="Email"
          class="borderless"
        />
        <q-input v-model="admin.role" type="text" filled label="Role" />
        <q-btn
          class="q-mt-md q-mb-sm"
          icon="edit"
          label="edit"
          @click="onClick"
          flat
          dense
          no-caps
          color="teal"
          text-white
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const onClick = () => {};
const admin = ref({});
</script>
<style scoped>
.my-card {
  width: 400px;
  margin: 10% auto;
}
</style>
