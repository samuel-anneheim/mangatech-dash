import { useState } from "react";
import useEditorList from "../../hooks/editor/useEditorList";
import Editor from "../../schema/editor.type";
import EditorService from "../../api/services/Editor.service";
import ActionsBlock from "../../components/ActionsBlock";
import { GridColDef } from "@mui/x-data-grid";
import ListView from "../../components/ListView";
import { Box } from "@mui/material";
import DeleteAlert from "../../components/alert/DeleteAlert";
import DeleteAlertSuccess from "../../components/alert/DeleteSuccessAlert";

const EditorList = () => {
  const { data, loadData, setData } = useEditorList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [nameDelete, setNameDelete] = useState("");

  const handleDelete = async () => {
    const newEditors = data.filter((editor: Editor) => editor.id !== idDelete);
    await EditorService.delete(idDelete);
    setSuccessDelete(true);
    setData(newEditors);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 15000); //15sec
  };

  const EditorDataGrid: GridColDef<Editor>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "countCollections",
      headerName: "Count of collections",
      flex: 1,
    },
    {
      field: "officialWebsite",
      headerName: "Official website",
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
            route="editor"
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
        collectionName="editor"
        alertWarn={alertWarn}
        setAlertWarn={setAlertWarn}
        nameDelete={nameDelete}
        idDelete={idDelete}
        handleDelete={handleDelete}
      />
      <DeleteAlertSuccess
        collectionName="editor"
        name={nameDelete}
        id={idDelete}
        alert={successDelete}
        setAlert={setSuccessDelete}
      />
      <ListView
        data={data}
        gridCol={EditorDataGrid}
        loadData={loadData}
        subtitle="List of editors"
        route="editor"
        title="Editors"
      />
    </Box>
  );
};

export default EditorList;
