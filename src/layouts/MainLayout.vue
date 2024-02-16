<template>
  <div>
    <ToolbarLayout @updateDrawer="toggleDrawer" />
    <NavigationDrawer :drawer="drawer" />
  </div>
</template>

<script setup>
import ToolbarLayout from "./ToolbarLayout.vue";
import NavigationDrawer from "./NavigationDrawer.vue";
import { ref } from "vue";

const drawer = ref(false);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
