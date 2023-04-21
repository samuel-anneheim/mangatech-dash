import { useState } from "react";
import useEditionList from "../../hooks/edition/useEditionList"
import Edition from "../../schema/edition.type";
import EditionService from "../../api/services/Edition.service";
import { GridColDef } from "@mui/x-data-grid";

const EditionList = () => {
  const { data, loadData, setData } = useEditionList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [nameDelete, setNameDelete] = useState("");

  const handleDelete = async () => {
    const newEditions = data.filter((edition: Edition) => edition.id !== idDelete);
    await EditionService.delete(idDelete);
    setSuccessDelete(true);
    setData(newEditions);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 15000); //15sec
  }

  const EditionDataGrid: GridColDef<Edition>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "collection.name",
      headerName: "Collection",
      flex: 1,
    },
  ]
}