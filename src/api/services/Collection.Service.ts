import Collection from "../../schema/collection.type";
import client from "../client";

class CollectionService {
  public list = async () => {
    return await client
      .get(`/collection`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public getOne = async (id: number) => {
    return await client
      .get(`/collection/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: Collection) => {
    return await client.post(`/collection`, data).catch((error) => {
      console.log(error);
      return false;
    });
  }

  public delete = async (id: number) => {
    return await client.delete(`/collection/${id}`).catch((error) => {
      console.log(error);
    });
  }

  public update = async (id: number, data: Collection) => {
    return await client.patch(`/collection/${id}`, data).catch((error) => {
      console.log(error);
      return false;
    });
  }
}

export default new CollectionService();
