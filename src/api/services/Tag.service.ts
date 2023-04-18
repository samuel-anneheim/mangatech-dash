import Tag from "../../schema/tag.type";
import client from "../client";

class TagService {
  public list = async () => {
    return await client
      .get(`/tag/countCollection`)
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: Tag, setAlert: any) => {
    return await client
      .post(`/tag`, data)
      .then(() => {
        setAlert(true);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public delete = async (id: number) => {
    return await client
      .delete(`/tag/${id}`)
      .catch((error) => {
        console.log(error);
      });
  };
}

export default new TagService();
