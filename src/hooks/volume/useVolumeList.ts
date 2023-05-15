import { useEffect, useState } from "react";
import VolumeService from "../../api/services/Volume.Service";

const useVolumeList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);

  useEffect(() => {
    VolumeService.list().then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useVolumeList;
