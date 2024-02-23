<template>
  <q-drawer
    v-if="store.isAuthenticated"
    :mini="miniState"
    @mouseover="updateMiniState(false)"
    @mouseout="updateMiniState(true)"
    elevated
    show-if-above
    v-model="drawerState"
    :width="250"
    :breakpoint="500"
    side="left"
    bordered
  >
    <!-- drawer content -->
    <q-scroll-area class="fit">
      <q-list padding class="menu-list">
        <q-item>
          <q-item-section class="q-ml-lg">
            <q-img
              src="../assets/titossy_img.png"
              alt="titossy"
              :width="miniState ? '40px' : '100px'"
              :height="miniState ? '40px' : '100px'"
            ></q-img>
            <!-- <q-img
              src="../assets/titossy_img.png"
              alt="titossy"
              width="100px"
              height="100px"
            ></q-img> -->
          </q-item-section>
        </q-item>
        <q-item to="/" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>

        <q-item clickable to="/customer" v-ripple>
          <q-item-section avatar>
            <q-icon name="business" />
          </q-item-section>
          <q-item-section> Customers </q-item-section>
        </q-item>

        <q-item clickable to="/employees" v-ripple>
          <q-item-section avatar>
            <q-icon name="work" />
          </q-item-section>
          <q-item-section> Employees </q-item-section>
        </q-item>

        <q-item clickable to="/supplier" v-ripple>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section> Supplier </q-item-section>
        </q-item>

        <q-item to="/schedule" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="pending_actions" />
          </q-item-section>
          <q-item-section>Services</q-item-section>
        </q-item>

        <q-item to="/payment" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="attach_money" />
          </q-item-section>
          <q-item-section>Payments</q-item-section>
        </q-item>

        <q-item to="/booking" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="today" />
          </q-item-section>
          <q-item-section>Booking</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useAuthStore } from "src/stores/authStore";

const store = useAuthStore();
const miniState = ref(false);
const props = defineProps({
  drawer: Boolean,
});
const drawerState = ref(false);
watchEffect(() => {
  drawerState.value = props.drawer;
});

const updateMiniState = (state) => {
  miniState.value = state;
};
</script>
<style lang="scss" scoped>
.menu-list {
  .q-item {
    border-radius: 0 32px 32px 0;
  }
}
</style>
