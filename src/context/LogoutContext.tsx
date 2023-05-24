import { useContext } from "react"
import { AuthContext } from "./AuthContext"
import Jwt from "../schema/jwt.type";
import jwt_decode from 'jwt-decode';
import { redirect } from "react-router-dom";

const LogoutContext = () => {
  const {setAuthenticated, accessToken, setAccessToken} = useContext(AuthContext);
  const decodedJwt: Jwt = jwt_decode(accessToken as string);
  console.log(decodedJwt);
  
  if (Date.now() >= decodedJwt.exp * 1000) {
    console.log('logout automatique');
    setAuthenticated(false);
    setAccessToken('');
    localStorage.clear();
    redirect('/login');
    return false;
  }
  return true;
}

export default LogoutContext;