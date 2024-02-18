import { defineStore } from "pinia";
import { db, storage, ref, uploadBytes, getDownloadURL } from "boot/firebase";
import { Timestamp, addDoc, collection, onSnapshot } from "firebase/firestore";

export const useServiceStore = defineStore("service", {
  state: () => ({
    services: {
      name: "",
      image: null,
      description: "",
      price: 0,
      category: "",
      rating: 0,
      status: "pending",
      createdAt: null,
    },
  }),
  actions: {
    async addService() {
      try {
        if (this.services.image) {
          if (!this.services.image.name) {
            throw new Error("Image file has no name.");
          }
          let imageRef = ref(storage, `services/${this.services.image.name}`);
          await uploadBytes(imageRef, this.services.image);
          this.services.image = await getDownloadURL(imageRef);
          this.services.createdAt = Timestamp.now();
        }
        await addDoc(collection(db, "service"), this.services);
        console.log("Document written with ID: ", this.services.id);
      } catch (e) {
        console.log("Unknown error occurred", e.message);
      }
    },
  },
});
