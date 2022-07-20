import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieWidget from "./MovieWidget";
import "./widgetLg.scss";
const WidGetLarge = () => {
  const [lastestMovie, setLastestMovie] = useState([]);

  const getLatestMovie = async () => {
    try {
      const res = await axios.get(`movies/`, {
        headers: {
          token: "nhat" + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setLastestMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLatestMovie();
  }, []);
  return (
    <div className="widgetLg flex-[2] shadow-lg p-5 text-black">
      <h3 className="text-2xl font-bold">Latest Movie</h3>
      <table className="w-full h-full border-spacing-4">
        <tbody>
          <tr>
            <th className=" text-left">Movie</th>
            <th className=" text-left">Title</th>
            <th className=" text-left">Genre</th>
            <th className=" text-left">Date</th>
            <th className=" text-left">Status</th>
          </tr>
          {lastestMovie &&
            lastestMovie.length > 0 &&
            lastestMovie
              .slice(0, 4)
              .map((movie, index) => (
                <MovieWidget
                  key={index}
                  pic={movie.poster_path}
                  title={movie.title}
                  genre={movie.genre.map((item) => item)}
                  date={movie.release_date}
                  status="Approved"
                ></MovieWidget>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default WidGetLarge;
