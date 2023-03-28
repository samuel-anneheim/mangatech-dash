const overloadStyleDatagrid = (colors: any) => ({
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
  "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
    color: `${colors.grey[100]} !important`,
  },
})

export default overloadStyleDatagrid