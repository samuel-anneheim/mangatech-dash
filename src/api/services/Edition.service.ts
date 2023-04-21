import client from "../client";

class EditionService {
  public list = async () => {
    return await client
      .get(`/edition/collections`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: any) => {
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
