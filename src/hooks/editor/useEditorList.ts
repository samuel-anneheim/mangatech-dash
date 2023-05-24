import { useEffect, useState } from "react";
import EditorService from "../../api/services/Editor.service";
import LogoutContext from "../../context/LogoutContext";

const useEditorList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion
    EditorService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useEditorList;
