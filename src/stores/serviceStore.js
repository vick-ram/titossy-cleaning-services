import { defineStore } from "pinia";
import { db } from "boot/firebase";
import { addDoc, collection } from "firebase/firestore";

export const useServiceStore = defineStore("service", {
  state: () => ({
    services: null,
  }),
  actions: {
    async addService(service) {
      try {
        const docRef = await addDoc(db.collection("services"), service);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
});
