import { useEffect, useState } from "react";
import CategoryService from "../../api/services/Category.service";
import LogoutContext from "../../context/LogoutContext";

const useCategoryList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion
    CategoryService.list().then(setData);
    setLoadData(false);
  }, []);

  return { data, loadData, setData };
}

export default useCategoryList;
