import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../MovieCard/MovieCard";

const MovieSimilar = ({ genre, id }) => {
  const [genre1] = genre;
  const rowRef = useRef(null);
  const [isMoved, setIsMoved] = useState(false);
  const handleClick = (direction) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const [similarMovies, setSimilarMovies] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSimilarMovies = async () => {
    try {
      const res = await axios.get(`/movies/`, {
        headers: {
          token: "nhat" + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setSimilarMovies(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSimilarMovies();
  }, [id]);
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="h-40 space-y-0.5 md:space-y-2">
        <div className="group relative md:-ml-2">
          <ChevronLeftIcon
            className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer  transition hover:scale-125 group-hover:opacity-100 ${
              !isMoved && "hidden"
            }`}
            onClick={() => handleClick("left")}
          />

          <div
            ref={rowRef}
            className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 md:p-2"
          >
            {similarMovies &&
              similarMovies.length > 0 &&
              similarMovies
                .filter(
                  (item) => item.genre.includes(genre1) && item._id !== id
                )
                .map((movie) => (
                  <MovieCard key={movie._id} movie={movie}></MovieCard>
                ))}
          </div>

          <ChevronRightIcon
            className=" absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer  transition hover:scale-125 group-hover:opacity-100"
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieSimilar;
