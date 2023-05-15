import ImageService from "../api/services/Image.service";

class FunctionHelper {
  public setEmptyToUndefined = (obj: any) => {
    for (const key in obj) {
      if (key === "nbrPages") continue;
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (element === "" || element === null || element === 0) {
          obj[key] = undefined;
        }
      }
    }
    return obj;
  }

  public uploadImage = (event: any, setLogo: any) => {
    if(!event.target.files[0]) return;
    ImageService.create(event.target.files[0]).then((res) => {
      setLogo(`http://localhost:8888/image/${res.filename}`);
    });
  };
}

export default new FunctionHelper();