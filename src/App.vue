<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <MainLayout />
      <q-page-container v-if="store.isAuthRoute" :key="store.$state.user">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { useAuthStore } from "./stores/authStore";
import { onBeforeMount } from "vue";
import MainLayout from "./layouts/MainLayout.vue";

const store = useAuthStore();

onBeforeMount(() => {
  store.watchAuthState();
});
</script>
