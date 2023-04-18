import Author from "../../schema/author.type";
import client from "../client";

class TagService {
  public list = async () => {
    return await client
      .get(`/author`)
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: Author, setAlert: any) => {
    return await client
      .post(`/author`, data)
      .then(() => {
        setAlert(true);
      })
      .catch((error) => {
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

export default new TagService();
