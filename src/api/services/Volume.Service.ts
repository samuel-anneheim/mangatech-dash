import Author from "../../schema/author.type";
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

  public create = async (data: Author, setAlert: any) => {
    return await client
      .post(`/volume`, data)
      .then(() => {
        setAlert(true);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public delete = async (id: number) => {
    return await client.delete(`/volume/${id}`).catch((error) => {
      console.log(error);
    });
  };
}

export default new VolumeService();
