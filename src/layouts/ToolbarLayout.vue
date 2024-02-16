<template>
  <q-header elevated class="q-pa-sm">
    <q-toolbar>
      <q-btn
        flat
        @click="emit('updateDrawer')"
        round
        dense
        icon="menu"
        class="q-mr-sm"
      />
      <q-toolbar-title class="q-ml-xl"
        >Titossy Cleaning Services</q-toolbar-title
      >
      <q-space />
      <q-btn flat round dense icon="person" class="q-mr-lg">
        <q-menu>
          <q-list>
            <q-item to="/profile" clickable v-ripple v-close-popup>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-item clickable v-ripple v-close-popup>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-item clickable v-ripple v-close-popup @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["updateDrawer"]);
const logout = async () => {
  await store.signOutUser();
  router.push("/sign-in");
};
</script>
