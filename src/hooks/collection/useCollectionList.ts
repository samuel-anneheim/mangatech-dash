import { useEffect, useState } from "react";
import CollectionService from "../../api/services/Collection.Service";

const useCollectionList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    CollectionService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useCollectionList;
