import axios from "axios";
import { React, useEffect, useState } from "react";

import Select from "react-select";
import { useRecoilValue } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Modal from "../../components/modal/Modal";
import MovieCard from "../../components/MovieCard/MovieCard";
import {
  genreOptions,
  countryOptions,
  yearOptions,
  timeOptions,
} from "../../constants/filter";

const CategoryPage = () => {
  const showModal = useRecoilValue(modalState);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countrySelected, setCountrySelected] = useState(null);
  const [yearSelected, setYearSelected] = useState(null);
  const [timeSelected, seTimeSelected] = useState([]);
  const [genreselected, setGenreSelected] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const filterGenreHandle = (e) => {
    setGenreSelected(e.value);
  };

  const filterCountryHandle = (e) => {
    setCountrySelected(e.value);
  };

  const filterYearHandle = (e) => {
    setYearSelected(e.value);
  };
  const filterTimeHandle = (e) => {
    console.log(e.value);
    const timeRange = String(e.value).split("-");
    seTimeSelected(e.value ? timeRange : []);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-5  mx-10 mt-20">
        <div className=" text-white w-[20%]">
          <label className="inline-block mb-2 font-bold">Genre</label>
          <Select
            className="text-black"
            defaultValue={genreOptions[0]}
            options={genreOptions}
            value={genreOptions.value}
            onChange={filterGenreHandle}
          />
        </div>
        <div className=" text-white w-[20%]">
          <label className="inline-block mb-2 font-bold">Country</label>
          <Select
            className="text-black"
            defaultValue={countryOptions[0]}
            options={countryOptions}
            value={countryOptions.value}
            onChange={filterCountryHandle}
          />
        </div>
        <div className=" text-white w-[20%]">
          <label className="inline-block mb-2 font-bold">Year</label>
          <Select
            className="text-black"
            defaultValue={yearOptions[0]}
            options={yearOptions}
            value={yearOptions.value}
            onChange={filterYearHandle}
          />
        </div>
        <div className=" text-white w-[20%]">
          <label className="inline-block mb-2 font-bold">Time</label>
          <Select
            className="text-black"
            defaultValue={timeOptions[0]}
            options={timeOptions}
            value={timeOptions.value}
            onChange={filterTimeHandle}
          />
        </div>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 mx-auto animate-spin mt-5"></div>
      )}
      {genreselected ||
      countrySelected ||
      yearSelected ||
      timeSelected.length > 0 ? (
        <div className="py-10 mt-10 px-7 ">
          <div className="grid grid-cols-6 gap-10  mx-10">
            {movies.length > 0 &&
              movies
                .filter(
                  (movie) =>
                    (genreselected
                      ? movie.genre.includes(genreselected)
                      : movie) &&
                    (countrySelected
                      ? movie.country === countrySelected
                      : movie) &&
                    (yearSelected
                      ? Number(movie.release_date) === Number(yearSelected)
                      : movie) &&
                    (timeSelected.length > 0
                      ? Number(movie.time) >= Number(timeSelected[0]) &&
                        Number(movie.time) <= Number(timeSelected[1])
                      : movie)
                )
                .map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            {showModal && <Modal />}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-y-8 mt-10">
          {movies.length > 0 &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          {showModal && <Modal />}
        </div>
      )}
    </>
  );
};

export default CategoryPage;
