import { useEffect, useState } from "react";
import EditionService from "../../api/services/Edition.service";
import LogoutContext from "../../context/LogoutContext";

const useEditionList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const checkValidConnexion = LogoutContext();


  useEffect(() => {
    checkValidConnexion
    EditionService.list().then(setData);
    setLoadData(false);
  } , []);

  return {data, loadData, setData};
}

export default useEditionList;
