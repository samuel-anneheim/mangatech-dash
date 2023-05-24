import { useContext, useState } from "react";
import useCategoryList from "../../hooks/category/useCategoryList";
import Category from "../../schema/category.type";
import CategoryService from "../../api/services/Category.service";
import { GridColDef } from "@mui/x-data-grid";
import ActionsBlock from "../../components/ActionsBlock";
import { Box } from "@mui/material";
import ListView from "../../components/ListView";
import DeleteAlert from "../../components/alert/DeleteAlert";
import DeleteAlertSuccess from "../../components/alert/DeleteSuccessAlert";
import { AuthContext } from "../../context/AuthContext";

const CategoryList = () => {
  const { data, loadData, setData } = useCategoryList();
  const [alertWarn, setAlertWarn] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [nameDelete, setNameDelete] = useState("");
  const {accessToken} = useContext(AuthContext);

  const handleDelete = async () => {
    const newCategories = data.filter(
      (category: Category) => category.id !== idDelete
    );
    await CategoryService.delete(idDelete, accessToken ? accessToken : '');
    setSuccessDelete(true);
    setData(newCategories);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 15000); //15sec
  };

  const CategoryDataGrid: GridColDef<Category>[] = [
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
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: ({ row }: any) => {
        return (
          <ActionsBlock
            id={row.id}
            name={row.name}
            route="category"
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
        collectionName="category"
        alertWarn={alertWarn}
        setAlertWarn={setAlertWarn}
        nameDelete={nameDelete}
        idDelete={idDelete}
        handleDelete={handleDelete}
      />
      <DeleteAlertSuccess
        collectionName="category"
        name={nameDelete}
        id={idDelete}
        alert={successDelete}
        setAlert={setSuccessDelete}
      />
      <ListView
        data={data}
        gridCol={CategoryDataGrid}
        loadData={loadData}
        subtitle = "List of categories"
        route="category"
        title="CATEGORY"
      />
    </Box>
   );
};

export default CategoryList;
