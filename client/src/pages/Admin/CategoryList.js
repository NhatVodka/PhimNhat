import React, { useContext, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/categoryContext/CategoryContext";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";
import {
  deleteCategory,
  getCategory,
} from "../../contexts/categoryContext/apiCalls";
const CategoryList = () => {
  const { category, dispatch } = useContext(CategoryContext);
  useEffect(() => {
    getCategory(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this category.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCategory(id, dispatch),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "categoryName",
      headerName: "Category",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: "/categoryAdmin/" + params.row._id,
              }}
              state={{ category: params.row }}
            >
              <EditIcon className="text-green-500 cursor-pointer mr-5" />
            </Link>
            <DeleteIcon
              onClick={() => handleDelete(params.row._id)}
              className=" text-red-600 cursor-pointer"
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="flex bg-white">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="flex-[4] p-5 w-full h-[600px]">
          <Link to="/newcategory">
            <button className="w-20 mb-3 outline-none p-[5px] rounded-md bg-green-400 cursor-pointer text-white text-lg font-semibold">
              Create
            </button>
          </Link>
          <DataGrid
            rows={category}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(r) => r._id}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
