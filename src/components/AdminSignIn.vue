<template>
  <div class="q-pa-md">
    <div class="row full-width justify-center">
      <q-card class="q-pa-md" style="min-width: 300px">
        <q-card-section class="q-gutter-md">
          <div class="text-h6">Sign In</div>
          <q-input v-model="admin.email" outlined label="Email" type="email" />
          <q-input
            v-model="admin.password"
            outlined
            label="Password"
            type="password"
          />
          <q-btn
            :loading="submitting"
            color="primary"
            label="Sign In"
            @click="signIn"
            style="display: block"
          >
            <template #loading>
              <q-spinner-ios />
            </template>
          </q-btn>
          <div style="display: inline-block">
            <p>Don't have an account?</p>
            <div style="width: auto; display: inline-block">
              <q-btn
                to="/sign-up"
                label="sign up"
                dense
                flat
                color="primary"
                style="width: auto; padding: 0; white-space: normal"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/authStore";
import { useRouter } from "vue-router";

const admin = ref({});
const authStore = useAuthStore();
const submitting = ref(false);
const router = useRouter();

const signIn = async () => {
  submitting.value = true;
  const newUser = await authStore.signInUser(
    admin.value.email,
    admin.value.password
  );
  if (newUser !== null) {
    authStore.user = newUser;
    router.push("/");
    console.log("Navigating to dashboard");
  } else {
    console.log("Sign in failed");
  }
  setTimeout(() => {
    submitting.value = false;
  }, 2000);
  clear();
};

const clear = () => {
  admin.value = {};
};
</script>
