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

  public create = async (data: Category) => {
    return await client
      .post(`/category`, data)
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  public update = async (id: number, data: Category) => {
    return await client.patch(`/category/${id}`, data).catch((error) => {
      console.log(error);
      return false;
    });
  };

  public delete = async (id: number) => {
    return await client.delete(`/category/${id}`).catch((error) => {
      console.log(error);
    });
  };
}

export default new CategoryService();
