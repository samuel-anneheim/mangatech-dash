import { useEffect, useState } from "react";
import functionHelper from "../../utils/functionHelper";
import Author from "../../schema/author.type";
import AuthorService from "../../api/services/Author.service";

const useAuthorEdit = (status: string, id?: number) => {
  const [initialValues, setInitialValues] = useState<Author>({
    name: "",
    surname: "",
    gender: "",
    image: "#",
    biography: "",
    dateOfBirth: "",
  } as Author);
  const [alertText, setAlertText] = useState<string>("SUCCESS ALERT");
  const [alertErrorText, setAlertErrorText] = useState<string>("ERROR ALERT");
  const [title, setTitle] = useState<string>("VIEW AUTHOR");
  const [subtitle, setSubtitle] = useState<string>("View author details");
  const [image, setImage] = useState<string>("#");

  useEffect(() => {
    if (status === "create") {
      setAlertErrorText("Author creation failed");
      setAlertText("Author created");
      setTitle("CREATE AUTHOR");
      setSubtitle("Create a new author");
    } else {
      if (id) {
        AuthorService.getOne(id).then((res) => {
          setInitialValues(functionHelper.formatEdtiForm(res));
          res.image && setImage(res.image);
        });
      }
      if (status === "edit") {
        setAlertText("Author updated");
        setAlertErrorText("Author update failed");
        setTitle("EDIT AUTHOR");
        setSubtitle("Edit author details");
      }
    }
  }, []);

  return { initialValues, alertErrorText, alertText, title, subtitle, image, setImage };
};

export default useAuthorEdit;
