import Category from "../../schema/category.type";
import client from "../client";

class CategoryService {
  public list = async () => {
    return await client
      .get(`/category/countCollection`)
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public getOne = async (id: number) => {
    return await client
      .get(`/category/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: Category, jwt: string) => {
    return await client
      .post(`/category`, data, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public update = async (id: number, data: Category, jwt: string) => {
    return await client
      .patch(`/category/${id}`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public delete = async (id: number, jwt: string) => {
    return await client
      .delete(`/category/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
}

export default new CategoryService();
