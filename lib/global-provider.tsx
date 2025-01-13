
import { createContext, ReactNode, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";


interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children:ReactNode }) => {
    const {
        data: user,
        loading,
        refetch
    } = useAppwrite({
        fn: getCurrentUser
    })

    const isLoggedIn = !!user;
   
    return (
        <GlobalContext.Provider value = {{ 
            isLoggedIn,
            user,
            loading,
            refetch,

         }}>
            {children}
        </GlobalContext.Provider>
    )
  };

  export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);

    if(!context){
        throw new Error('Error');

    }
    return context;
  }

  export default GlobalProvider;