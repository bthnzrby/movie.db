import { User } from "firebase/auth";
import { ReactNode, FC, createContext, useState, useEffect,useContext } from "react";

interface ProviderProps {
  children: ReactNode;
}

interface IAuthContext{
  getUser: () => User;
  user:User;
  setUser: any;
}


export const AuthContext = createContext({} as ReturnType<typeof useContext>);

const AuthProvider: FC<ProviderProps> = ({ children }) => {

  const [user, setUser] = useState<User | undefined>()

  useEffect(() => {
    const localUser = (localStorage.getItem("userData"))
    if(localUser)
      setUser(JSON.parse(localUser))
  }, [])

  const getUser = () =>{
    const localUser = (localStorage.getItem("userData"))
    if(localUser)
      return (JSON.parse(localUser));
  }

  return (
    <AuthContext.Provider value={{user ,getUser,setUser}}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth =():IAuthContext=>{
  return useContext(AuthContext) as IAuthContext
}

export default AuthProvider;