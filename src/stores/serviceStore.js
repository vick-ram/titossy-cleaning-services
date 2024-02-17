import { defineStore } from "pinia";
import { db, storage, ref, uploadBytes, getDownloadURL } from "boot/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";

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
    },
  }),
  actions: {
    async addService(service) {
      try {
        if (service.image) {
          if (!service.image.name) {
            throw new Error("Image file has no name.");
          }
          let imageRef = ref(storage, `services/${service.image.name}`);
          await uploadBytes(imageRef, service.image);
          let imageUrl = await getDownloadURL(imageRef);
          let createdAt = Timestamp();
          // service.image = await getDownloadURL(imageRef);

          // await addDoc(collection(db, "service"), service);
          await addDoc(collection(db, "service"), {
            ...service,
            image: imageUrl,
            createdAt,
          });
          console.log("Document written with ID: ", serviceData.id);
        }
      } catch (e) {
        switch (e.code) {
          case "storage/unknown":
            console.log("Unknown error occurred, inspect the server response");
            break;
          case "storage/object-not-found":
            console.log("Object not found");
            break;
          case "storage/bucket-not-found":
            console.log("Bucket not found");
            break;
          case "storage/project-not-found":
            console.log("Project not found");
            break;
          case "unauthenticated":
            console.log("User is unauthenticated");
            break;
          case "unauthorized":
            console.log("User is unauthorized to perform the desired action");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/invalid-argument":
            console.log("Invalid argument provided");
            break;
          case "storage/invalid-url":
            console.log("Invalid URL provided");
            break;
          default:
            console.log("Unknown error occurred", e.code, e.message);
        }
      }
    },
  },
});
