import Author from "../../schema/author.type";
import client from "../client";

class AuthorService {
  public list = async () => {
    return await client
      .get(`/author`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public getOne = async (id: number) => {
    return await client
      .get(`/author/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: Author, jwt: string) => {
    return await client
      .post(`/author`, data, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public update = async (id: number, data: Author, jwt: string) => {
    return await client
      .patch(`/author/${id}`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public delete = async (id: number, jwt: string) => {
    return await client
      .delete(`/author/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
}

export default new AuthorService();
