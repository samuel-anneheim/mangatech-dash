import Editor from "../../schema/editor.type";
import client from "../client";

class EditorService {
  public list = async () => {
    return await client
      .get(`/editor/countCollections`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public getOne = async (id: number) => {
    return await client
      .get(`/editor/${id}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  public create = async (data: Editor) => {
    return await client.post(`/editor`, data).catch((error) => {
      console.log(error);
      return false;
    });
  };

  public delete = async (id: number) => {
    return await client.delete(`/editor/${id}`).catch((error) => {
      console.log(error);
    });
  };

  public update = async (id: number, data: Editor) => {
    return await client.patch(`/editor/${id}`, data).catch((error) => {
      console.log(error);
      return false;
    });
  };
}

export default new EditorService();
