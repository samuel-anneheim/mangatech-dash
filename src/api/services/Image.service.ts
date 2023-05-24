import client from "../client";

class ImageService {
  public create = async (data: any, jwt: string) => {
    let formData = new FormData();
    formData.append("file", data);
    return await client
      .post(`/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
}

export default new ImageService();
