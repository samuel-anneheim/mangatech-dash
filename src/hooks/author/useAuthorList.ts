import { useEffect, useState } from "react";
import AuthorService from "../../api/services/Author.service";
import LogoutContext from "../../context/LogoutContext";

const useAuthorList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion
    AuthorService.list().then(setData);
    setLoadData(false);
  }, []);

  return { data, loadData, setData };
};

export default useAuthorList;
