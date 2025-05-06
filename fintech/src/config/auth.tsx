import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../config/AuthUser";

interface AuthViewProps {
  onSaveSettings: () => void;
}

export const AuthView = ({ onSaveSettings }: AuthViewProps) => {
  const { userData } = useAuth();
  
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signOut_ = async () => {
    try {
      await signOut(auth);
      console.log("User Signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const saveSettings = async () => {
    if (!userData) return;
    try {
      await onSaveSettings();
      console.log("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const loginBtns = () => {
    return userData ? (
      <div className="flex items-center gap-2">
        <button 
          onClick={saveSettings}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
        >
          Save Profile
        </button>
        <button 
          onClick={signOut_}
          className="px-4 py-2 text-base font-medium text-white hover:text-gray-200"
        >
          Logout
        </button>
      </div>
    ) : (
      <button 
        onClick={signInWithGoogle}
        className="px-4 py-2 text-base font-medium text-white hover:text-gray-200"
      >
        Sign in with Google
      </button>
    );
  };

  const userImage = () => {
    return userData?.image ? (
      <img 
        src={userData.image} 
        alt="User profile" 
        className="h-10 w-10 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
    ) : null;
  };

  return (
    <div className="flex items-center gap-2">
      {userImage()}
      {loginBtns()}
    </div>
  );
};