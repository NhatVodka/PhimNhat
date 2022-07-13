import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovie } from "../../services/movie";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  console.log(query);
  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovie();
      setMovies(data);
    };
    getMovies();
  }, []);
  return (
    <div className="py-10 mt-12 px-7">
      <div>
        <div className="filter flex gap-7 items-center mb-6">
          <h1 className="text-lg font-bold hover:text-gray-200 cursor-pointer">
            All genres
          </h1>
          <div className="flex gap-7 font-bold text-gray-400 cursor-pointer">
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Romance
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Animation
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Adventure
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Drama
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Action
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Crime
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Comedy
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Family
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              Music
            </h3>
          </div>
        </div>
        <div className="filter flex gap-7 items-center mb-6">
          <h1 className="text-lg font-bold hover:text-gray-200 cursor-pointer">
            All time periods
          </h1>
          <div className="flex gap-7 font-bold text-gray-400 cursor-pointer">
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              2022
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              2021
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              2020
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              2019
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              2018
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              2017
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              2016
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              2015-2010
            </h3>
            <h3
              onClick={(e) => setQuery(e.target.innerText)}
              className="hover:text-gray-100"
            >
              other
            </h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies
            .filter(
              (movie) =>
                movie.genre.includes(query) ||
                movie.release_date.includes(query)
            )
            .map((item) => <MovieCard key={item._id} item={item}></MovieCard>)}
      </div>
    </div>
  );
};

export default MoviePage;
