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

  public update = async (id: number, data: any, jwt: string) => {
    return await client
      .patch(`/tag/${id}`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public create = async (data: Tag, jwt: string) => {
    return await client
      .post(`/tag`, data, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public delete = async (id: number, jwt: string) => {
    return await client
      .delete(`/tag/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
}

export default new TagService();
