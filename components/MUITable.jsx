import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    width: 200,
  },
  {
    field: "totalPrice",
    headerName: "Toal Price",
    sortable: true,
    type: "number",
    width: 140,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    width: 200,
  },
];

const rows = [
  {
    id: 1,
    fullName: "Saif Ahmed",
    email: "mdsaifahmed530@gmail.com",
    totalPrice: 400,
    status: "completed",
  },
  {
    id: 2,
    fullName: "Noor Mahmud",
    email: "noormahmud@gmail.com",
    totalPrice: 770,
    status: "pending",
  },
  {
    id: 3,
    fullName: "Ahmed Shakik",
    email: "muhammedshakik51@gmail.com",
    totalPrice: 990,
    status: "cancled",
  },
];

export default function DataTable() {
  return (
    <div className="h-screen w-full p-4">
      <DataGrid
        rows={rows}
        columns={columns}
        getCellClassName={(params) => {
          if (params.field == "status") {
            if (params.value == "completed") return "bg-green-300";
            if (params.value == "pending") return "bg-yellow-300";
            if (params.value == "cancled") return "bg-rose-300";
          }
        }}
        pageSize={10}
        autoHeight
        rowsPerPageOptions={[10]}
        // checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
