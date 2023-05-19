import Author from "../../schema/author.type";
import Volume from "../../schema/volume.type";
import client from "../client";

class VolumeService {
  public list = async () => {
    return await client
      .get(`/volume/allData`)
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: Volume) => {
    return await client
      .post(`/volume`, data)
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public update = async (id: number, data: Volume ) => {
    return await client.patch(`/volume/${id}`, data).catch((error) => {
      console.log(error);
      return false;
    });
  }

  public getOne = async (id: number) => {
    return await client
      .get(`/volume/${id}/allRelations`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public delete = async (id: number) => {
    return await client.delete(`/volume/${id}`).catch((error) => {
      console.log(error);
    });
  };
}

export default new VolumeService();
