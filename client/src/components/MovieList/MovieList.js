import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../MovieCard/MovieCard";

import axios from "axios";
const MovieList = ({ categoryName }) => {
  const [movieCategory, setMovieCategory] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMovieCategory = async () => {
    try {
      const res = await axios.get(
        `category${categoryName ? `?categoryName=${categoryName}` : ""}`
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
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movieCategory.length > 0 &&
          movieCategory.map((item, index) => (
            <SwiperSlide key={index}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
