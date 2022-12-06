import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtom";
const Banner = () => {
  const [movie, setMovie] = useState([]);

  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get(`movies/`);
        setMovie(res.data[Math.floor(Math.random() * res.data.length)]);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-16">
      <div className="absolute left-0 top-0 h-[95vh] -z-10 w-screen">
        <img
          src={`${movie?.backdrop_path || movie?.poster_path}`}
          alt="bannerImage"
          className=" object-cover"
        />
      </div>

      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {movie?.title}
      </h1>
      {movie.desc && movie.desc.length > 0 && (
      <p className=" max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.desc?.length > 100 ? movie?.desc.slice(0,100) + "..." : movie?.desc}
      </p>
      )}

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
