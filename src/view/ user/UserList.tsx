import { GridColDef } from "@mui/x-data-grid";
import ActionsBlock from "../../components/ActionsBlock";
import ListView from "../../components/ListView";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import DeleteAlert from "../../components/alert/DeleteAlert";
import DeleteAlertSuccess from "../../components/alert/DeleteSuccessAlert";
import UserService from "../../api/services/User.service";
import User from "../../schema/user.type";
import useUserList from "../../hooks/user/useUserList";
import { AuthContext } from "../../context/AuthContext";

const   UserList = () => {
  const { data, loadData, setData } = useUserList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [emailDelete, setEmailDelete] = useState("");
  const {accessToken} = useContext(AuthContext);

  const handleDelete = async () => {
    const newUser = data.filter((user: User) => user.id !== idDelete);
    await UserService.delete(idDelete, accessToken ? accessToken : '');
    setSuccessDelete(true);
    setData(newUser);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 15000); //15sec
  };

  const UserDatagrid: GridColDef<User>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "countVolume",
      headerName: "Count Volume",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: ({ row }: any) => {
        return (
          <ActionsBlock
            id={row.id}
            name={row.name}
            route="user"
            setAlert={setAlertWarn}
            setNameDelete={setEmailDelete}
            setIdDelete={setIdDelete}
          />
        );
      },
    },
  ];

  return (
    <Box>
      <DeleteAlert
        collectionName="user"
        alertWarn={alertWarn}
        setAlertWarn={setAlertWarn}
        nameDelete={emailDelete}
        idDelete={idDelete}
        handleDelete={handleDelete}
      />
      <DeleteAlertSuccess 
        collectionName="user"
        name={emailDelete}
        id={idDelete}
        alert={successDelete}
        setAlert={setSuccessDelete}
      />
      <ListView
        data={data}
        loadData={loadData}
        gridCol={UserDatagrid}
        title={"USER"}
        subtitle={"List of users"}
        route={"user"}
      />
    </Box>
  );
};

export default UserList;
