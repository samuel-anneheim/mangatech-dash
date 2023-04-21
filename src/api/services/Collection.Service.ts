import client from "../client";

class CollectionService {
  public list = async () => {
    return await client
      .get(`/collection`)
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public create = async (data: any) => {
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

  public update = async (id: number, data: any) => {
    return await client.put(`/collection/${id}`, data).catch((error) => {
      console.log(error);
    });
  }
}

export default new CollectionService();
