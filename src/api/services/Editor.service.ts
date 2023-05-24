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

  public create = async (data: Editor, jwt: string) => {
    return await client
      .post(`/editor`, data, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public delete = async (id: number, jwt: string) => {
    return await client
      .delete(`/editor/${id}`, { headers: { Authorization: `Bearer ${jwt}` } })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  public update = async (id: number, data: Editor, jwt: string) => {
    return await client
      .patch(`/editor/${id}`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
}

export default new EditorService();
