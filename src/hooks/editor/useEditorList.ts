import { useEffect, useState } from "react";
import EditorService from "../../api/services/Editor.service";

const useEditorList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    EditorService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useEditorList;
