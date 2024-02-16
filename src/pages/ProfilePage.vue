<template>
  <div>
    <h5>Profile page</h5>
    <router-link to="/sign-in">sign in</router-link> |
    <router-link to="/sign-up">sign up</router-link>

    <p>{{ store.firstName }}</p>
  </div>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { useAuthStore } from "src/stores/authStore";

const store = useAuthStore();
</script>
