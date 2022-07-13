import React, { useContext, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { MovieContext } from "../../contexts/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../contexts/movieContext/apiCalls";

const MovieList = () => {
  const { movies, dispatch } = useContext(MovieContext);
  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this movie.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteMovie(id, dispatch),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    {
      field: "movie",
      headerName: "Movie",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-2">
            <img className="w-6 h-6" src={params.row.poster_path} alt="" />
            <h2 className="text-base">{params.row.title}</h2>
          </div>
        );
      },
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 200,
    },
    {
      field: "release_date",
      headerName: "Year",
      width: 160,
    },
    {
      field: "vote_average",
      headerName: "Rating",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{ pathname: "/moviesAdmin/" + params.row._id }}>
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
          <Link to="/newmovie">
            <button className="w-20 mb-3 outline-none p-[5px] rounded-md bg-green-400 cursor-pointer text-white text-lg font-semibold">
              Create
            </button>
          </Link>
          <DataGrid
            rows={movies}
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

export default MovieList;
