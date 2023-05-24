import { useEffect, useState } from "react";
import EditorService from "../../api/services/Editor.service";
import Editor from "../../schema/editor.type";
import functionHelper from "../../utils/functionHelper";
import LogoutContext from "../../context/LogoutContext";

const useEditorEdit = (status: string, id?: number) => {
  const [initialValues, setInitialValues] = useState<Editor>({
    name: "",
    logo: "#",
    description: "",
    officialWebsite: "",
  } as Editor);
  const [alertText, setAlertText] = useState<string>("SUCCESS ALERT");
  const [alertErrorText, setAlertErrorText] = useState<string>("ERROR ALERT");
  const [title, setTitle] = useState<string>("VIEW EDITOR");
  const [subtitle, setSubtitle] = useState<string>("View editor details");
  const [logo, setLogo] = useState<string>("#");
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion
    if (status === "create") {
      setAlertErrorText("Editor creation failed");
      setAlertText("Editor created");
      setTitle("CREATE EDITOR");
      setSubtitle("Create a new editor");
    } else {
      if (id) {
        EditorService.getOne(id).then((res) => {
          setInitialValues(functionHelper.formatEdtiForm(res));
          res.logo && setLogo(res.logo);
        });
      }
      if (status === "edit") {
        setAlertText("Editor updated");
        setAlertErrorText("Editor update failed");
        setTitle("EDIT EDITOR");
        setSubtitle("Edit editor details");
      }
    }
  }, []);

  return { initialValues, alertErrorText, alertText, title, subtitle, logo, setLogo };
};

export default useEditorEdit;
