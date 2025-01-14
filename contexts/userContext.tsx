import { ID } from "react-native-appwrite";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { account, avatars } from "../lib/appwrite";
import { toast } from "@/lib/toast";



// Define the shape of the user object (you can replace `any` with a more specific type if available)
type User = {
    email: string;
    name?: string;
    position?: string;
    avatar?: string; // Add avatar property
  };

// Define the context value type
interface UserContextType {
  current: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  toast: (message: string) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use the UserContext
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

// Props for the UserProvider
interface UserProviderProps {
  children: ReactNode;
}

  // Fetch avatar for the user
  async function fetchAvatar(email: string): Promise<string> {
    try {
      const avatarUrl = avatars.getInitials(email).toString();
      return avatarUrl; // Return avatar URL
    } catch (error) {
      console.error("Failed to fetch avatar:", error);
      return ""; // Return an empty string if fetching fails
    }
  }

// UserProvider component
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    try {
      // Create a session
      await account.createEmailPasswordSession(email, password);
  
      // Fetch and set user data
      const userData = await account.get();
      const avatar = await fetchAvatar(userData.email);

      const position = userData.prefs?.position || "Unknown";
      setUser({ ...userData, avatar, position });
  
      console.log("User logged in:", userData);
      toast("Welcome back. You are logged in");
    } catch (error) {
      console.error("Login error:", error);
      toast("Failed to log in. Please try again.");
    }
  }
  


async function logout() {

  try {
    await account.deleteSession("current"); // Log the user out
    setUser(null); // Clear the user state
    console.log("Logged out");
    toast("Logged out");
  } catch (error) {
    console.error("Logout error:", error);
    toast("An error occurred during logout.");
  }
}


  async function register(email: string, password: string) {
    await account.create(ID.unique(), email, password);
    await login(email, password);
    toast("Account created");
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      const avatar = await fetchAvatar(loggedIn.email);
      const position = loggedIn.prefs?.position || "Unknown";
      setUser({ ...loggedIn, avatar, position });
      console.log('loggedIn');
      toast("Welcome back. You are logged in");
    } catch (err) {
      setUser(null);
    }
  }


  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider value={{ current: user, login, logout, register, toast }}>
      {children}
    </UserContext.Provider>
  );
}
