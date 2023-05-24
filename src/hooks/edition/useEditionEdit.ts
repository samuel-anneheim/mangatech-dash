import { useEffect, useState } from "react";
import functionHelper from "../../utils/functionHelper";
import EditionService from "../../api/services/Edition.service";
import Edition from "../../schema/edition.type";
import Collection from "../../schema/collection.type";
import CollectionService from "../../api/services/Collection.Service";
import LogoutContext from "../../context/LogoutContext";

const useEditionEdit = (status: string, id?: number) => {
  const [initialValues, setInitialValues] = useState<Edition>({
    name: "",
    collectionId: 0,
  } as Edition);
  const [alertText, setAlertText] = useState<string>("SUCCESS ALERT");
  const [alertErrorText, setAlertErrorText] = useState<string>("ERROR ALERT");
  const [title, setTitle] = useState<string>("VIEW EDITION");
  const [subtitle, setSubtitle] = useState<string>("View edition details");
  const [collections, setCollections] = useState<Collection[]>([]);
  const checkValidConnexion = LogoutContext();


  useEffect(() => {
    checkValidConnexion
    CollectionService.list().then((data) => setCollections(data));  
    if (status === "create") {
      setAlertErrorText("Edition creation failed");
      setAlertText("Edition created");
      setTitle("CREATE EDITON");
      setSubtitle("Create a new edition");
    } else {
      if (id) {
        EditionService.getOne(id).then((res) => {
          setInitialValues(functionHelper.formatEdtiForm(res));
        });
      }
      if (status === "edit") {
        setAlertText("Edition updated");
        setAlertErrorText("Edition update failed");
        setTitle("EDIT EDITION");
        setSubtitle("Edit edition details");
      }
    }
  }, []);

  return { initialValues, alertErrorText, alertText, title, subtitle, collections };
};

export default useEditionEdit;
