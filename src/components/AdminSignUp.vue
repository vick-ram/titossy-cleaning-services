<template>
  <div class="q-pa-pm">
    <div class="row full-width justify-center">
      <q-card class="q-pa-md" style="min-width: 300px">
        <q-card-section class="q-gutter-md">
          <h6>Sign Up</h6>
          <q-input
            v-model="firstName"
            type="text"
            outlined
            label="first name"
          />
          <q-input v-model="lastName" type="text" outlined label="last name" />
          <q-input v-model="email" type="email" outlined label="email" />
          <q-input
            v-model="password"
            type="password"
            outlined
            label="password"
          />
          <q-btn
            :loading="submitting"
            type="submit"
            label="sign up"
            @click="signUp"
            color="primary"
          >
            <template #loading> <q-spinner-ios /> </template
          ></q-btn>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "src/stores/authStore";

const store = useAuthStore();
const { firstName, lastName, email, password } = storeToRefs(store);
const submitting = ref(false);

const signUp = async () => {
  submitting.value = true;
  await store.registerUser();
  setTimeout(() => {
    submitting.value = false;
  }, 2000);
};
</script>
