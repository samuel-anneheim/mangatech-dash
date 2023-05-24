import { useEffect, useState } from "react";
import VolumeService from "../../api/services/Volume.Service";
import LogoutContext from "../../context/LogoutContext";

const useVolumeList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const checkValidConnexion = LogoutContext();

  useEffect(() => {
    checkValidConnexion;
    VolumeService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useVolumeList;
