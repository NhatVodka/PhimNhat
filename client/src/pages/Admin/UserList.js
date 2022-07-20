import React, { useContext, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import { UserContext } from "../../contexts/userContext/UserContext";
import { deleteUser, getUsers } from "../../contexts/userContext/apiCalls";

const UserList = () => {
  const { users, dispatch } = useContext(UserContext);
  useEffect(() => {
    getUsers(dispatch);
  }, []);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this user.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(id, dispatch),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center">
            <img
              src={params.row.profilePic}
              className="w-8 h-8 rounded-[50%] object-cover mr-3"
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/usersAdmin/" + params.row._id}>
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
    <div className="flex bg-white text-black z-0">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="flex-[4] p-5 w-full h-[600px]">
          <Link to="/newuser">
            <button className="w-20 mb-3 outline-none p-[5px] rounded-md bg-green-400 cursor-pointer text-white text-lg font-semibold">
              Create
            </button>
          </Link>
          <DataGrid
            rows={users}
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

export default UserList;
