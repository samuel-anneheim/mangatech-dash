import { useEffect, useState } from "react";
import CategoryService from "../../api/services/Category.service";

const useCategoryList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    CategoryService.list().then(setData);
    setLoadData(false);
  }, []);

  return { data, loadData, setData };
}

export default useCategoryList;
