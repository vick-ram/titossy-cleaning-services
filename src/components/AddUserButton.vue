<template>
  <div>
    <q-btn
      color="primary"
      label="Add User"
      icon="add"
      class="full-width"
      @click="icon = true"
    />
  </div>
  <CustomDialog :show="icon" @update:show="icon = $event">
    <div>
      <AddUserCard />
    </div>
  </CustomDialog>
</template>

<script setup>
import { ref } from "vue";
import AddUserCard from "components/AddUserCard.vue";
import CustomDialog from "./CustomDialog.vue";
const icon = ref(false);
</script>
