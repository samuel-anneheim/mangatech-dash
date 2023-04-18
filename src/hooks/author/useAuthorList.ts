import { useEffect, useState } from "react";
import AuthorService from "../../api/services/Author.service";

const useAuthorList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    AuthorService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useAuthorList
