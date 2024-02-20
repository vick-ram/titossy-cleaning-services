import { defineStore } from "pinia";
import { db } from "src/boot/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const usePaymentStore = defineStore("payment", {
  state: () => ({
    payment: null,
  }),
  actions: {},
});
