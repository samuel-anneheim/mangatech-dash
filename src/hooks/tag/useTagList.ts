import { useEffect, useState } from "react";
import TagService from "../../api/services/Tag.service";

const useTagList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    TagService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useTagList
