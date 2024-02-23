import { ref, onMounted } from "vue";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "boot/firebase";

export default function useEmployeeData() {
  const row = ref([]);
  const row2 = ref([]);

  onMounted(async () => {
    const unsubscribe = onSnapshot(collection(db, "employees"), (snapshot) => {
      let index = 1;
      row.value = [];
      row2.value = [];
      snapshot.forEach((doc) => {
        const data = { id: doc.id, index: index, ...doc.data() };
        if (data.role !== "admin" && data.role !== "supplier") {
          row.value.push(data);
          index++;
        } else if (data.role === "supplier") {
          row2.value.push(data);
          index++;
        }
      });
    });
    console.log(row.value);
    return unsubscribe;
  });

  return { row, row2 };
}
