import client from "../client";
import jwt_decode from 'jwt-decode';
import Jwt from "../../schema/jwt.type";

class AuthService {
  
  public login = async (username: string, password: string) => {
    return await client
      .post(`/login`, { username, password })
      .then((response) => {
        const decodedJwt: Jwt = jwt_decode(response.data.access_token);
        if (decodedJwt.roles === 'user') {
          return false;
        }
        return response.data;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  }
}

export default new AuthService();