import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../contexts/categoryContext/CategoryContext";
import { MovieContext } from "../../contexts/movieContext/MovieContext";
import { getMovies } from "../../contexts/movieContext/apiCalls";
import { createCategory } from "../../contexts/categoryContext/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const NewCategory = () => {
  const { dispatch } = useContext(CategoryContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();
  const showToastMessage = () => {
    toast.success('Add NewCategory Successfully!!', {
      position: toast.POSITION.TOP_RIGHT
    });
};
  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory({ ...category, [e.target.name]: value });
  };
  const handleSelect = (e) => {
    const results = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    let value = movies.filter((item) => {
      return results.includes(item._id);
    });
    setCategory({ ...category, [e.target.name]: value });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    showToastMessage();
    createCategory(category, dispatch);
    setTimeout(() => {
      navigate("/categoryAdmin/");
    },3000)
  };

  return (
    <>

    <div className="flex bg-white">
      <Sidebar />
      <div className="flex-[4]">
        <Navbar />
        <div className="p-5">
          <h1 className="text-2xl font-bold">New Category</h1>
          <form className="flex flex-wrap gap-10 text-black">
            <div className="w-[400px] flex flex-col mt-3 mr-5 gap-10">
              <div className="w-[400px] flex flex-col mt-3 mr-5">
                <label className="mb-3 text-xl font-semibold text-black">
                  Title
                </label>
                <input
                  className="h-5 p-4 border-2 border-gray-400 rounded"
                  type="text"
                  placeholder="Trending"
                  name="categoryName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3  text-xl font-semibold text-black">
                Movies
              </label>
              <select
                multiple
                className="h-[200px] rounded"
                name="results"
                id="results"
                onChange={handleSelect}
              >
                {movies.map((movie) => (
                  <option
                    className="text-black"
                    key={movie._id}
                    value={movie._id}
                  >
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[100px] self-center mr-5">
              <button
                className="outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default NewCategory;
