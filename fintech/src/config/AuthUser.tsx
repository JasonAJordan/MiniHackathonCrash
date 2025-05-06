import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
//import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
//import { User } from "../types/types";

// JUST MAKE THE USER TYPE HERE


// Data that has the actual user auth
interface AuthContextType {
  userData: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as User);
        } else {
          console.log("User does not exist, creating user");
          // PLEASE CHANGE BELOW
          const newUser: User = {
            userId: currentUser.uid,
            userName: currentUser.email || "",
            name: currentUser.displayName || "",
            image: currentUser.photoURL || "",
            bio: "",
            requestsFilled: 0,
            offersPosted: 0,
            recentPosts: [],
            availability: [],
          };
          await setDoc(userRef, newUser);
          setUserData(newUser);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext, TY chat GPT
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};



