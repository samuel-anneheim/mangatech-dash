import { useEffect, useState } from "react";
import EditionService from "../../api/services/Edition.service";

const useEditionList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    EditionService.list().then(setData);
    setLoadData(false);
  } , []);

  return {data, loadData, setData};
}

export default useEditionList;
