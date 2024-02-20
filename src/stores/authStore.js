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
    isInitialized: false,
    router: useRouter(),
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    user: {},
  }),
  getters: {
    first_name() {
      console.log("User in firstName getter:", this.user);
      if (this.user && this.user.displayName) {
        const names = this.user.displayName.split(" ");
        return names.length > 0 ? names[0] : "";
      }
      return "";
    },
    last_name() {
      console.log("User in lastName getter:", this.user);
      if (this.user && this.user.displayName) {
        const names = this.user.displayName.split(" ");
        return names.length > 1 ? names[1] : "";
      }
      return "";
    },
    isAuthenticated() {
      return Object.keys(this.user).length !== 0;
    },
  },
  actions: {
    async registerUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;
        const displayName = `${this.firstName} ${this.lastName}`;
        await updateProfile(user, { displayName });
        user.displayName = displayName;
        await setDoc(doc(db, "employees", user.uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          email: user.email,
          password: this.password,
          role: "admin",
        });
        this.user = {
          ...user,
          displayName: displayName,
        };
        this.router.push("/").catch((error) => {
          console.log(error);
        });
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

    async signInUser() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        if (userCredential.user) {
          this.router.push("/").catch((error) => {
            console.log(error);
          });
        }
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
        this.router.push("/sign-in").catch((error) => {
          console.log(error);
        });
        this.email = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.user = {};
      } catch (error) {
        console.log(error);
      }
    },

    init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.user.id = user.uid;
            this.user.email = user.email;
            this.router.push("/").catch((error) => {
              console.log(error);
            });
          } else {
            this.user = {};
            this.router.push("/sign-in").catch((error) => {
              console.log(error);
            });
          }
          this.isInitialized = true;
          resolve();
        });
      });
    },
  },
});
