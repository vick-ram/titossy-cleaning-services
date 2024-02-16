<template>
  <div>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-card-actions align="right">
        <q-btn flat round dense icon="close" @click="close" />
      </q-card-actions>
      <q-card-section class="q-gutter-md">
        <h6>Create employee</h6>
        <q-input
          clearable
          class="q-p"
          outlined
          type="name"
          label="first name"
          v-model.capitalize="user.firstName"
        />
        <q-input
          clearable
          outlined
          type="name"
          label="last name"
          v-model.capitalize="user.lastName"
        />
        <q-input
          clearable
          outlined
          type="email"
          label="email"
          v-model.trim="user.email"
        />
        <q-input
          clearable
          v-model="user.password"
          outlined
          label="password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
          clearable
          outlined
          type="number"
          label="phone"
          maxlength="10"
          v-model.trim="user.phone"
        />
        <q-select
          clearable
          :loading="submitting"
          outlined
          label="role"
          v-model.trim="user.role"
          :options="roles"
        />
        <q-btn label="Submit" type="submit" color="primary" @click="createUser">
          <template #loading>
            <q-spinner-ios />
          </template>
        </q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth, db } from "src/boot/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
const submitting = ref(false);
const user = ref({
  firstName: "",
  lastName: "",
  gender: "",
  email: "",
  password: "",
  phone: 0,
  role: "",
  createdAt: "",
  status: "",
});

const roles = ref([
  "manager",
  "supervisor",
  "finance",
  "inventory",
  "supplier",
  "cleaner",
]);

const isPwd = ref(true);

const createUser = async () => {
  submitting.value = true;
  const email = user.value.email;
  const password = user.value.password;

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const newUser = userCredential.user;
  const creationTime = newUser.metadata.creationTime;
  const localCreationTime = new Date(creationTime).toLocaleString("en-US", {
    timeZone: "Africa/Nairobi",
  });

  console.log(newUser);
  const userRefs = doc(db, "employees", newUser.uid);

  await setDoc(userRefs, {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    gender: user.value.gender,
    email: user.value.email,
    password: user.value.password,
    phone: user.value.phone,
    role: user.value.role,
    createdAt: localCreationTime,
    status: "active",
  });
  console.log(`Document written with ID: ${userRefs.id}`);
  console.log(`user created at: ${localCreationTime}`);
  close();
  submitting.value = false;
};

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<style scoped>
.actions-top-left {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
