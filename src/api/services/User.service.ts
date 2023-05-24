import User from "../../schema/user.type";
import client from "../client";

class UserService {
  public list = async (jwt: string) => {
    return await client
      .get(`/user`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: User, jwt: string) => {
    return await client
      .post(`/user`, data, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public update = async (id: number, data: User, jwt: string) => {
    return await client
      .patch(`/user/${id}`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public getOne = async (id: number, jwt: string) => {
    return await client
      .get(`/user/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public delete = async (id: number, jwt: string) => {
    return await client
      .delete(`/user/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
}

export default new UserService();
