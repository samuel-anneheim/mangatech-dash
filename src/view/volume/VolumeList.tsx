import { GridColDef } from "@mui/x-data-grid";
import ActionsBlock from "../../components/ActionsBlock";
import ListView from "../../components/ListView";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import DeleteAlert from "../../components/alert/DeleteAlert";
import DeleteAlertSuccess from "../../components/alert/DeleteSuccessAlert";
import VolumeService from "../../api/services/Volume.Service";
import useVolumeList from "../../hooks/volume/useVolumeList";
import Volume from "../../schema/volume.type";
import LinkViewList from "../../components/LinkViewList";
import { AuthContext } from "../../context/AuthContext";

const   VolumeList = () => {
  const { data, loadData, setData } = useVolumeList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [nameDelete, setNameDelete] = useState("");
  const {accessToken} = useContext(AuthContext);

  const handleDelete = async () => {
    const newVolume = data.filter((tag: Volume) => tag.id !== idDelete);
    await VolumeService.delete(idDelete, accessToken ? accessToken : '');
    setSuccessDelete(true);
    setData(newVolume);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 15000); //15sec
  };

  const VolumeDatagrid: GridColDef<Volume>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "edition.collection.title",
      headerName: "Collection",
      flex: 1,
      renderCell: ({ row }: any) => {
        return <LinkViewList 
        id={row.edition?.collection?.id}
        value={row.edition?.collection?.title}
        route="collection"
      />
      }
    },
    {
      field: "edition.name",
      headerName: "Edition",
      flex: 1,
      renderCell: ({ row }: any) => {
        return <LinkViewList 
          id={row.edition?.id}
          value={row.edition?.name}
          route="edition"
        />
;
      }
    },
    {
      field: "followNumber",
      headerName: "Follow Number",
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
            route="volume"
            setAlert={setAlertWarn}
            setNameDelete={setNameDelete}
            setIdDelete={setIdDelete}
          />
        );
      },
    },
  ];

  return (
    <Box>
      <DeleteAlert
        collectionName="volume"
        alertWarn={alertWarn}
        setAlertWarn={setAlertWarn}
        nameDelete={nameDelete}
        idDelete={idDelete}
        handleDelete={handleDelete}
      />
      <DeleteAlertSuccess 
        collectionName="volume"
        name={nameDelete}
        id={idDelete}
        alert={successDelete}
        setAlert={setSuccessDelete}
      />
      <ListView
        data={data}
        loadData={loadData}
        gridCol={VolumeDatagrid}
        title={"VOLUMES"}
        subtitle={"List of volumes"}
        route={"volume"}
      />
    </Box>
  );
};

export default VolumeList;
