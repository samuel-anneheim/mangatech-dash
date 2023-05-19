import Edition from "../../schema/edition.type";
import client from "../client";

class EditionService {
  public list = async () => {
    return await client
      .get(`/edition/collections`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public get = async (id: number) => {
    return await client.get(`/edition/${id}`).catch((error) => {
      console.log(error);
    });
  };

  public update = async (id: number, data: Edition ) => {
    return await client.patch(`/edition/${id}`, data).catch((error) => {
      console.log(error);
      return false;
    });
  }

  public getOne = async (id: number) => {
    return await client
      .get(`/edition/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public getWhereCollectionId = async (id: number) => {
    return await client
      .get(`/edition/collectionId/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: Edition) => {
    return await client.post(`/edition`, data).catch((error) => {
      console.log(error);
      return false;
    });
  };

  public delete = async (id: number) => {
    return await client.delete(`/edition/${id}`).catch((error) => {
      console.log(error);
    });
  };
}

export default new EditionService();
