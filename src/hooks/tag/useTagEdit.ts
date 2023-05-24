import { useEffect, useState } from "react";
import TagService from "../../api/services/Tag.service";
import Tag from "../../schema/tag.type";
import LogoutContext from "../../context/LogoutContext";

const useTagEdit = (status: string, id?: number) => {
  const [initialValues, setInitialValues] = useState<Tag>({ name: "" } as Tag);
  const [alertText, setAlertText] = useState<string>("SUCCESS ALERT");
  const [alertErrorText, setAlertErrorText] = useState<string>("ERROR ALERT");
  const [title, setTitle] = useState<string>("VIEW TAG");
  const [subtitle, setSubtitle] = useState<string>("View tag details");
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion
    if (status === "create") {
      setAlertErrorText("Tag creation failed");
      setAlertText("Tag created");
      setTitle("CREATE TAG");
      setSubtitle("Create a new tag");
    } else {
      if (id) {
        TagService.getOne(id).then((res) => {
          setInitialValues(res);
        });
      }
      if (status === "edit") {
        setAlertText("Tag updated");
        setAlertErrorText("Tag update failed");
        setTitle("EDIT TAG");
        setSubtitle("Edit tag details");
      }
    }
  }, []);

  return { initialValues, alertErrorText, alertText, title, subtitle };
};

export default useTagEdit;
