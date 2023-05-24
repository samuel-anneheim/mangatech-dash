import dayjs from "dayjs";
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
  };

  public uploadImage = (event: any, setLogo: any) => {
    if (!event.target.files[0]) return;
    ImageService.create(event.target.files[0]).then((res) => {
      setLogo(`http://localhost:8888/image/${res.filename}`);
    });
  };

  public formatEditPatch = (
    value: any,
    initialValue: any,
    image: string | null = null
  ) => {
    const res: any = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const element = value[key];
        
        if (element !== initialValue[key]) {
          if (key === "dateOfBirth" && element) {
            this.dateOfBirthCompare(element, initialValue) ??
              (res[key] = element);
          } else {
            res[key] = !element ? null : element;
          }
        }
      }
    }

    if (image) {
      if (
        initialValue.hasOwnProperty("image") &&
        initialValue.image !== image
      ) {
        res.image = image === "#" ? null : image;
      } else if (
        initialValue.hasOwnProperty("logo") &&
        initialValue.logo !== image
      ) {
        res.logo = image === "#" ? null : image;
      } else if (
        initialValue.hasOwnProperty("picture") &&
        initialValue.picture !== image
      ) {
        res.picture = image === "#" ? null : image;
      }
    }
    if (Object.keys(res).length === 0) return false;
    return res;
  };

  public dateOfBirthCompare = (date: any, initialValue: any) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    const oldDate = dayjs(initialValue).format("YYYY-MM-DD");
    if (newDate !== oldDate) {
      return date;
    }
    return false;
  };

  public formatEdtiForm = (values: any) => {
    const res: any = {};
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const element = values[key];
        if (element) {
          if (key === "dateOfBirth" || key === "releaseDate") {
            res[key] = dayjs(values[key]);
          } else {
            res[key] = element;
          }
        } else {
          if (key === "image" || key === "logo") {
            res[key] = "#";
          } else if (key === "isFinish" || key === "visibility") {
            res[key] = false;
          } else {
            res[key] = "";
          }
        }
      }
    }
    return res;
  };
}

export default new FunctionHelper();
