import Tag from "../../schema/tag.type";
import client from "../client";

class TagService {
  public list = async () => {
    return await client
      .get(`/tag/countCollection`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public getOne = async (id: number) => {
    return await client
      .get(`/tag/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public update = async (id: number, data: any) => {
    return await client
      .patch(`/tag/${id}`, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public create = async (data: Tag) => {
    return await client
      .post(`/tag`, data)
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
