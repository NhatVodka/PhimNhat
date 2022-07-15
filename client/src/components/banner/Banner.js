import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

import { Link } from "react-router-dom";
const Banner = () => {
  const [movies, setMovies] = useState([]);
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
    <section className="banner h-[400px] page-container mb-20 overflow-hidden mt-16">
      <Swiper grabCursor="true" slidesPerView="auto">
        {movies.length > 0 &&
          movies.slice(0, 4).map((item) => (
            <SwiperSlide key={item._id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ item }) {
  const { poster_path, title, genre, _id } = item;
  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={poster_path}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          {genre.length > 0 &&
            genre.map((genre, index) => (
              <span
                key={index}
                className="py-4 px-4 border border-white rounded-md"
              >
                {genre}
              </span>
            ))}
        </div>
        <Link to={`/watch/${_id}`}>
          <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
            Watch Now
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Banner;
