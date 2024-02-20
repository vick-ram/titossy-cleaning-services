import { defineStore } from "pinia";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "src/boot/firebase";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customer: null,
  }),
  actions: {
    async fetchCustomers() {
      const data = onSnapshot(collection(db, "customers"), (snapshot) => {
        snapshot.forEach((doc) => {
          let response = { id: doc.id, ...doc.data() };
          this.customer = response;
        });
      });
      return data;
    },
  },
});
