import { useContext, useEffect, useState } from "react";
import UserService from "../../api/services/User.service";
import LogoutContext from "../../context/LogoutContext";
import { AuthContext } from "../../context/AuthContext";

const useUserList = () => {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const checkValidConnexion = LogoutContext();
  const {accessToken} = useContext(AuthContext);

  useEffect(() => {
    checkValidConnexion;
    UserService.list(accessToken ? accessToken : '').then(setData);
    setLoadData(false);
  }, []);

  return {data, loadData, setData};
}

export default useUserList;