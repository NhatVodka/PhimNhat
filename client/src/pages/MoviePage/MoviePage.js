import React, { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovie } from "../../services/movie";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMovie();
      setMovies(data);
    };
    getMovies();
  }, []);
  return (
    <div className="py-10 mt-12 px-7">
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item._id} item={item}></MovieCard>
          ))}
      </div>
    </div>
  );
};

export default MoviePage;
