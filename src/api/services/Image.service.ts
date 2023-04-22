import client from "../client";

class ImageService {
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
    let formData = new FormData();
    formData.append("file", data);
    console.log(data);
    return await client
      .post(`/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        return data;
      })
      .catch((error) => {
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

export default new ImageService();
