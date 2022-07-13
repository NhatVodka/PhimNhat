import { React, useEffect, useState } from "react";

import Select from "react-select";
import MovieCard from "../../components/MovieCard/MovieCard";
import { categoryOptions, genreOptions } from "../../constants/filter";
import { fetchMovie } from "../../services/movie";
const CategoryPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryselected, setCategorySelected] = useState(null);
  const [genreselected, setGenreSelected] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMovies = async () => {
    try {
      const data = await fetchMovie();
      setMovies(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
    setLoading(false);
  }, []);
  // const getCategory = async (categoryselected) => {
  //   const category = await fetchCategory(categoryselected);
  //   setMovies(category[0].results);
  // };
  // useEffect(() => {
  //   getCategory(categoryselected);
  // }, [categoryselected, genreselected]);
  return (
    <>
      <div className="flex items-center justify-center gap-5  mx-10 mt-20">
        <div className=" text-white w-[20%]">
          <label className="inline-block mb-2 font-bold">Category</label>
          <Select
            className="text-black"
            defaultValue={categoryOptions[0]}
            options={categoryOptions}
            value={categoryOptions.value}
            onChange={(e) => setCategorySelected(e.value)}
          />
        </div>
        <div className=" text-white w-[20%]">
          <label className="inline-block mb-2 font-bold">Genre</label>
          <Select
            className="text-black"
            defaultValue={genreOptions[0]}
            options={genreOptions}
            value={genreOptions.value}
            onChange={(e) => setGenreSelected(e.value)}
          />
        </div>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin mt-5"></div>
      )}
      {genreselected ? (
        <div className="py-10 mt-10 px-7 ">
          <div className="grid grid-cols-4 gap-10">
            {movies.length > 0 &&
              movies
                .filter((movie) => movie.genre.includes(genreselected))
                .map((item) => (
                  <MovieCard key={item._id} item={item}></MovieCard>
                ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-10 mt-10">
          {movies.length > 0 &&
            movies.map((item) => (
              <MovieCard key={item._id} item={item}></MovieCard>
            ))}
        </div>
      )}
    </>
  );
};

export default CategoryPage;
