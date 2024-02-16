<template>
  <div class="q-pa-pm">
    <div class="row full-width justify-center">
      <q-card class="q-pa-md" style="min-width: 300px">
        <q-card-section class="q-gutter-md">
          <h6>Sign Up</h6>
          <q-input
            v-model="admin.first_name"
            type="text"
            outlined
            label="first name"
          />
          <q-input
            v-model="admin.last_name"
            type="text"
            outlined
            label="last name"
          />
          <q-input v-model="admin.email" type="email" outlined label="email" />
          <q-input
            v-model="admin.password"
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/authStore";

const router = useRouter();
const admin = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  role: "admin",
});
const store = useAuthStore();
const submitting = ref(false);

const signUp = async () => {
  submitting.value = true;
  const newUser = await store.registerUser(
    admin.value.first_name,
    admin.value.last_name,
    admin.value.email,
    admin.value.password
  );
  if (newUser) {
    store.user = newUser;
    router.push("/");
  } else {
    console.log("Registration failed");
  }
  setTimeout(() => {
    submitting.value = false;
  }, 2000);
  clear();
};

const clear = () => {
  admin.value = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "admin",
  };
};
</script>
