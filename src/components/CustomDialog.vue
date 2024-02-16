<!-- eslint-disable vue/no-mutating-props -->
<template>
  <q-dialog
    v-model="show"
    :maximized="maximized"
    :no-backdrop-dismiss="noBackdropDismiss"
  >
    <q-card>
      <q-card-section>
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { watchEffect } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  maximized: {
    type: Boolean,
    default: false,
  },
  noBackdropDismiss: {
    type: Boolean,
    default: false,
  },
});

watchEffect(() => {
  emit("update:show", props.show);
});
</script>
