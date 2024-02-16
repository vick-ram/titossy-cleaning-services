<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff">
      <MainLayout />
      <q-page-container
        v-if="store.$state.user && !isAuthIndependentRoute"
        :key="store.$state.user"
      >
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { useAuthStore } from "./stores/authStore";
import { ref, onBeforeMount, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import MainLayout from "./layouts/MainLayout.vue";

const store = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  store.watchAuthState();
});

const isAuthIndependentRoute = computed(() => {
  const currentRoute = router.currentRoute.value;
  return (
    (!store.$state.user && currentRoute.path === "/sign-in") ||
    currentRoute.path === "/sign-up"
  );
});
</script>
