import client from "../client";

class EditorService {
  public list = async () => {
    return await client
      .get(`/editor/countCollections`)
      .then((response) => {
        const data = response.data;
        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public create = async (data: any) => {
    return await client.post(`/editor`, data).catch((error) => {
      console.log(error);
      return false;
    });
  }

  public delete = async (id: number) => {
    return await client.delete(`/editor/${id}`).catch((error) => {
      console.log(error);
    });
  }

  public update = async (id: number, data: any) => {
    return await client.put(`/editor/${id}`, data).catch((error) => {
      console.log(error);
    });
  }
}

export default new EditorService();
