import { Box, useTheme, Typography} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import EmailList from "../../components/EmailList";

type RecordInvoices = {
  id: number;
  name: string;
  email: string;
  cost: string;
  phone: string;
  date: string;
}

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: GridColDef<RecordInvoices>[] = [
    { field: "id", headerName: "ID"},
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "date",
      headerName: "Date",
      type: "string",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone number",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params: any) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      )
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ row: {email}}: any) => { 
        return(
          <EmailList email={email}/>
        )
      }
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of invoice balances" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            background: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        <DataGrid rows={mockDataInvoices} columns={columns} checkboxSelection />
      </Box>
    </Box>
  );
};

export default Invoices;
