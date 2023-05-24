import { useEffect, useState } from "react";
import TagService from "../../api/services/Tag.service";
import LogoutContext from "../../context/LogoutContext";

const useTagList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion;
    TagService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useTagList
