import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Modal from "../../components/modal/Modal";
import MovieCard from "../../components/MovieCard/MovieCard";
import { fetchMovie } from "../../services/movie";

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const showModal = useRecoilValue(modalState);
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
  return (
    <>
      <div className="py-10 page-container mt-10">
        <input
          className="w-full max-w-full  py-4 px-3 text-xl rounded-md border border-blue-400 outline-none text-black"
          type="text"
          placeholder="Nhập tên phim..."
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && (
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin mt-5"></div>
        )}
      </div>
      <div className="grid grid-cols-6 gap-10 mt-10 mx-10">
        {!loading &&
          movies.length > 0 &&
          movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(query.trim().toLowerCase())
            )
            .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        {showModal && <Modal />}
      </div>
    </>
  );
};

export default SearchPage;
