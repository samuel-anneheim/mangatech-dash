import { useEffect, useState } from "react";
import CollectionService from "../../api/services/Collection.Service";
import LogoutContext from "../../context/LogoutContext";

const useCollectionList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion
    CollectionService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useCollectionList;
