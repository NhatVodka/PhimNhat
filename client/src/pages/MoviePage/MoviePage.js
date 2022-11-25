import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Modal from "../../components/modal/Modal";
import MovieCard from "../../components/MovieCard/MovieCard";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const showModal = useRecoilValue(modalState);
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
  }, []);
  return (
    <div className="py-10 mt-20 px-7">
      <div className="grid grid-cols-5 gap-y-8">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      {showModal && <Modal />}
    </div>
  );
};

export default MoviePage;
