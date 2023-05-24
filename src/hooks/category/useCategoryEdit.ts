import { useEffect, useState } from "react";
import functionHelper from "../../utils/functionHelper";
import Category from "../../schema/category.type";
import CategoryService from "../../api/services/Category.service";
import LogoutContext from "../../context/LogoutContext";

const useCategoryEdit = (status: string, id?: number) => {
  const [initialValues, setInitialValues] = useState<Category>({
    name: "",
    description: "",
    image: "#",
  } as Category);
  const [alertText, setAlertText] = useState<string>("SUCCESS ALERT");
  const [alertErrorText, setAlertErrorText] = useState<string>("ERROR ALERT");
  const [title, setTitle] = useState<string>("VIEW CATEGORY");
  const [subtitle, setSubtitle] = useState<string>("View category details");
  const [image, setImage] = useState<string>("#");
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion
    if (status === "create") {
      setAlertErrorText("Category creation failed");
      setAlertText("Category created");
      setTitle("CREATE CATEGORY");
      setSubtitle("Create a new category");
    } else {
      if (id) {
        CategoryService.getOne(id).then((res) => {
          setInitialValues(functionHelper.formatEdtiForm(res));
          res.image && setImage(res.image);
        });
      }
      if (status === "edit") {
        setAlertText("Category updated");
        setAlertErrorText("Category update failed");
        setTitle("EDIT CATEGORY");
        setSubtitle("Edit category details");
      }
    }
  }, []);

  return { initialValues, alertErrorText, alertText, title, subtitle, image, setImage };
};

export default useCategoryEdit;
