import { defineStore } from "pinia";
import { auth, db } from "boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    router: useRouter(),
    user: null,
  }),
  getters: {
    firstName() {
      console.log("User in firstName getter:", this.user);
      return this.user && this.user.displayName
        ? this.user.displayName.split(" ")[0]
        : "";
    },
    lastName() {
      console.log("User in lastName getter:", this.user);
      return this.user && this.user.displayName
        ? this.user.displayName.split(" ")[1]
        : "";
    },
    isAuthenticated() {
      return this.user !== null;
    },
  },
  actions: {
    async registerUser(firstName, lastName, email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const displayName = `${firstName} ${lastName}`;
        await updateProfile(user, { displayName });
        user.displayName = displayName;
        await setDoc(doc(db, "employees", user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          password: password,
          role: "admin",
        });
        this.user = {
          ...user,
          displayName: displayName,
        };
        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            console.log("Email already in use");
            break;
          case "auth/invalid-email":
            console.log("Invalid email");
            break;
          case "auth/weak-password":
            console.log("Weak password");
            break;
          default:
            console.log("Error: ", error);
        }
      }
    },

    async signInUser(email, password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await userCredential.user.reload();
        this.user = userCredential.user;
        console.log("User after signing in:", this.user);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            console.log("User not found");
            break;
          case "auth/wrong-password":
            console.log("Wrong password");
            break;
          default:
            console.log("Error: ", error);
        }
      }
    },

    async signOutUser() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.log(error);
      }
    },

    watchAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        } else {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            this.user = JSON.parse(storedUser);
            if (
              (router.isReady() &&
                router.currentRoute.value.path === "/sign-in") ||
              router.currentRoute.value.path === "/sign-up"
            ) {
              router.push("/").catch((error) => {
                console.log(error);
              });
            }
          } else {
            this.user = null;
          }
        }
      });
    },
  },
});
