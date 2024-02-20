<template>
  <div>
    <ProfilePage />
  </div>
</template>

<script setup>
import { useAuthStore } from "src/stores/authStore";
import ProfilePage from "../components/profile/ProfilePage.vue";

const store = useAuthStore();
</script>
