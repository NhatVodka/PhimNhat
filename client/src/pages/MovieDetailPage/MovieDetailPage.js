import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import Comments from "../../components/comments/Comments";
import MovieCredit from "../../components/movieCredit/MovieCredit";
import MovieTrailer from "../../components/movieTrailer/MovieTrailer";
import MovieSimilar from "../../components/similarMovie/MovieSimilar";
import { fetcher } from "../../config";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data } = useSWR(`${id ? `/movies/${id}` : ""}`, fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, desc, genre } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative mt-10">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url("${backdrop_path}")`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`${poster_path}`}
          alt=""
          className="w-full object-cover h-full rounded-xl"
        />
      </div>{" "}
      <Link to={`/watch/${id}`}>
        <button className="absolute left-[45%] top-100 py-3 px-10 capitalize rounded-lg bg-primary mt-auto hover:bg-[#db0510] ease-in-out duration-300">
          Watch Now
        </button>
      </Link>
      <h1 className="text-center text-4xl text-white font-bold mb-10 mt-16">
        {title}
      </h1>
      {genre && genre.length >= 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genre.map((item, index) => (
            <a
              href={`/category/${item.name}`}
              className="py-2 px-4 border-primary text-primary rounded bg-white"
              key={index}
            >
              {item}
            </a>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed  max-w-[600px] mx-auto mb-10">
        {desc}
      </p>
      <div className="p-6">
      <MovieCredit></MovieCredit>
      </div>
      <div className="p-6">
      <MovieTrailer></MovieTrailer>
      </div>
      <div className="p-6">
      <MovieSimilar genre={genre} id={id}></MovieSimilar>
      </div>
      <Comments id={id}></Comments>
    </div>
  );
};

export default MovieDetailPage;
