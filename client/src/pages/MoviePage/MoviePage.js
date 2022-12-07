import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Card from "../../components/Card/Card";
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
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => <Card key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default MoviePage;
