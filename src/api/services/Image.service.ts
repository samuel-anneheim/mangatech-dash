import client from "../client";

class ImageService {
  public create = async (data: any) => {
    let formData = new FormData();
    formData.append("file", data);
    return await client
      .post(`/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data
        return data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
}

export default new ImageService();
