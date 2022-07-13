import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../MovieCard/MovieCard";

import axios from "axios";
const MovieList = ({ categoryName }) => {
  const [category, setCategory] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCategory = async () => {
    try {
      const res = await axios.get(
        `category${categoryName ? `?categoryName=${categoryName}` : ""}`
      );
      setCategory(res.data[0].results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {category.length > 0 &&
          category.map((item, index) => (
            <SwiperSlide key={index}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
