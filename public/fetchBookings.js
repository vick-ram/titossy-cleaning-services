import { ref, onMounted } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "boot/firebase";

export default function useBookingData() {
  const row = ref([]);

  onMounted(async () => {
    const unsubscribe = onSnapshot(collection(db, "booking"), (snapshot) => {
      let index = 1;
      row.value = [];
      snapshot.forEach((doc) => {
        const data = { id: doc.id, index: index, ...doc.data() };
        row.value.push(data);
        index++;
      });
      console.log(row.value);
    });
    return unsubscribe;
  });

  return { row };
}
