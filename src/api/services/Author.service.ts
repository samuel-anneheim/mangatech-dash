import { AxiosResponse } from "axios";
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

  public create = async (data: Author) => {
    return await client.post(`/author`, data).catch((error) => {
      console.log(error);
      return false;
    });
  };

  public update = async (id: number, data: Author) => {
    return await client.patch(`/author/${id}`, data).catch((error) => {
      console.log(error);
      return false;
    });
  };

  public delete = async (id: number) => {
    return await client.delete(`/author/${id}`).catch((error) => {
      console.log(error);
    });
  };
}

export default new AuthorService();
