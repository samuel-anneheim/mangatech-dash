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

  public create = async (data: Category, setAlert: any) => {
    return await client
      .post(`/category`, data)
      .then(() => {
        setAlert(true);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  public delete = async (id: number) => {
    return await client.delete(`/category/${id}`).catch((error) => {
      console.log(error);
    });
  };
}

export default new CategoryService();
