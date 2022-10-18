import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";
const MovieList = ({ title }) => {
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
  const [movieCategory, setMovieCategory] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMovieCategory = async () => {
    try {
      const res = await axios.get(
        `category${title ? `?categoryName=${title}` : ""}`
      );
      setMovieCategory(res.data[0].results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieCategory();
  }, []);

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
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
          {movieCategory.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className=" absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer  transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default MovieList;
