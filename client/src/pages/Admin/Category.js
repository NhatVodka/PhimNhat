import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import { updateCategory } from "../../contexts/categoryContext/apiCalls";
import { CategoryContext } from "../../contexts/categoryContext/CategoryContext";
import { getMovies } from "../../contexts/movieContext/apiCalls";
import { MovieContext } from "../../contexts/movieContext/MovieContext";

const Category = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(CategoryContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const { categoryId } = useParams();
  const location = useLocation();
  const { state } = location;
  const [category, setCategory] = useState(state.category);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);
  // Function Handle Update Category
  const handleChange = (e) => {
    const value = e.target.value;
    setCategory({
      ...category,
      [e.target.name]: value,
    });
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
  const handleUpdate = (e, id) => {
    e.preventDefault();
    updateCategory(id, category, dispatch);
    navigate("/categoryAdmin/");
  };
  return (
    <div className="flex bg-white ">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="flex-[4] p-5 ">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Edit Category</h1>
          </div>
          <div className="flex mt-5">
            <div className="flex-[2] p-5 shadow-lg">
              <div className="flex items-center">
                <div className="flex flex-col ml-3">
                  <span className="font-semibold text-lg"></span>
                </div>
              </div>
              <div className="flex flex-col mt-3 text-lg">
                <span className="text-lg font-semibold text-gray-500">
                  Category Details
                </span>
                <div className="my-5 mx-0 text-gray-400">
                  <span className="ml-3 text-black">ID : {category._id}</span>
                </div>
                <div className="my-5 mx-0 text-gray-400">
                  <span className="ml-3 text-black">
                    Title: {category.categoryName}
                  </span>
                </div>

                <div className="my-5 mx-0 text-black">
                  <h1 className="text-xl ml-3 mb-3 ">Movie:</h1>
                  {category.results.map((movie, index) => (
                    <span
                      key={index}
                      className="flex flex-col ml-3 mt-3 text-black"
                    >
                      {movie.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-[2] p-5 shadow-lg ml-5 text-black">
              <span className="text-2xl font-bold">Edit</span>
              <form className="flex justify-between mt-5">
                <div>
                  <div className="flex flex-col mt-3 gap-2">
                    <label className="mb-1 text-base ">Category Title</label>
                    <input
                      type="text"
                      className="border-b-2 outline-none  w-[250px]"
                      placeholder={category.categoryName}
                      name="categoryName"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mt-5 mr-5">
                    <label className="mb-3  text-xl font-semibold text-black">
                      Movies
                    </label>
                    <select
                      multiple
                      className="h-[300px] rounded"
                      name="results"
                      id="results"
                      onChange={handleSelect}
                    >
                      {movies.map((movie) => (
                        <option
                          className="text-black text-lg"
                          key={movie._id}
                          value={movie._id}
                        >
                          {movie.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex items-center"></div>
                  <button
                    className="outlinie-none p-2 cursor-pointer rounded-md bg-blue-600 text-white"
                    onClick={(e) => handleUpdate(e, categoryId)}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
