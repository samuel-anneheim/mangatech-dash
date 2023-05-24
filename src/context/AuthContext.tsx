import { useNavigate } from 'react-router-dom';
import { createContext, ReactNode, useState } from 'react'

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void
  accessToken: string | null;
  setAccessToken: (newState: string) => void
}

const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  accessToken: '',
  setAccessToken: () => {}
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({children}: Props) => {
  //Initializing an auth state with false value (unauthenticated)
  const [ authenticated, setAuthenticated ] = useState(localStorage.getItem("logged") === 'true' ? true : false)
  const [ accessToken, setAccessToken ] = useState(localStorage.getItem("access_token") ? localStorage.getItem("access_token") : '');
  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated, accessToken, setAccessToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export {  AuthContext, AuthProvider }