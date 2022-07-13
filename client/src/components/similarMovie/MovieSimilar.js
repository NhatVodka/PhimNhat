import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router";
import MovieCard from "../MovieCard/MovieCard";

const MovieSimilar = ({ genre }) => {
  const { id } = useParams();
  const [similarMovies, setSimilarMovies] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSimilarMovies = async () => {
    try {
      const res = await axios.get(
        `genre${genre ? `?Genre=${genre[0] || genre[1]}` : ""}`,
        {
          headers: {
            token:
              "nhat" + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      setSimilarMovies(res.data[0]?.Movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSimilarMovies();
  }, []);
  const NewSimilarMovies = similarMovies.filter((item) => item._id !== id);
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {NewSimilarMovies.length > 0 &&
            NewSimilarMovies.map((item) => (
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
