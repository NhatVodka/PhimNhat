import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../MovieCard/MovieCard";

const MovieSimilar = ({ genre, id }) => {
  const [genre1] = genre;

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
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {similarMovies &&
            similarMovies.length > 0 &&
            similarMovies
              .filter((item) => item.genre.includes(genre1) && item._id !== id)
              .map((item) => (
                <SwiperSlide key={item._id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieSimilar;
