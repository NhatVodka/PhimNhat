import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(`movies/`);
        setMovies(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
    setLoading(false);
  }, []);
  const filterMovie = movies
  .filter((movie) =>
    movie.title.toLowerCase().includes(query.trim().toLowerCase())
  )
  return (
    <>
      <div className="py-10 page-container mt-20">
        <input
          className="w-full max-w-full  py-4 px-3 text-xl rounded-md border border-blue-400 outline-none text-black"
          type="text"
          placeholder="Nhập tên phim..."
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && (
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin mt-5"></div>
        )}
        {filterMovie.length > 0 ? (
            <div className="grid grid-cols-4 gap-10 mt-10 mx-10">
              {filterMovie
              .map((item) => <Card key={item._id} item={item} />)} 
            </div>
          ): (
            <div className="mt-10 text-2xl font-bold w-full flex items-center justify-center gap-4">
              <MagnifyingGlassIcon className="hidden sm:inline  h-6 w-6" />
              <p className="">No Result Found</p>
            </div>
            )
        }
    </div>
    </>
  );
};

export default SearchPage;
