import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import MovieSimilar from "../../components/similarMovie/MovieSimilar";
import { fetcher } from "../../config";
import { AuthContext } from "../../contexts/authContext/AuthContext";
// import { Swiper, SwiperSlide } from "swiper/react";
// import MovieCard from "../../components/MovieCard/MovieCard";
// import axios from "axios";

const MovieDetailPage = () => {
  const { user } = useContext(AuthContext);
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
          className="w-full h-full object-cover rounded-xl"
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
      <MovieCredit></MovieCredit>
      <MovieTrailer></MovieTrailer>
      <MovieSimilar genre={genre}></MovieSimilar>
      {!user ? (
        <textarea
          className="h-15 w-full p-4 outline-none rounded text-black"
          type="text"
          placeholder="Write your comment"
        />
      ) : (
        <div className="comment-section border-t-2 border-gray-700 ml-4 ">
          <h2 className="text-4xl mb-5 mt-5">Comment</h2>
          <div>
            <form className="w-[400px] flex flex-col">
              <textarea
                className="h-15 w-full p-4 outline-none rounded text-black"
                type="text"
                placeholder="Write your comment"
              />
              <button className="mt-3 p-1 text-sm border-2 self-end cursor-pointer rounded-sm">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function MovieCredit() {
  const { id } = useParams();
  const { data } = useSWR(`${id ? `/movies/${id}` : ""}`, fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length < 0) return null;
  return (
    <>
      <h2 className=" text-3xl mb-10 ">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.map((item) => (
          <div className="cast-item" key={item}>
            <img
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              src={item}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
}

function MovieTrailer() {
  const { id } = useParams();
  const { data } = useSWR(`${id ? `/movies/${id}` : ""}`, fetcher);
  if (!data) return null;
  const { trailer } = data;
  if (!trailer || trailer.length <= 0) return null;
  return (
    <>
      <div className="py-10">
        <h1 className="text-3xl mb-6">Trailer</h1>
        <div className="grid grid-cols-2 gap-10">
          {trailer.map((item) => (
            <div className="" key={item}>
              <div key={item.id} className="w-full aspect-video">
                <iframe
                  width="885"
                  height="498"
                  src={`https://www.youtube.com/embed/${item}`}
                  title="YOU'RE TOO LITTLE BOY! We Invaded D1 School Full of TRASH TALKERS!! 5v5 ECS Streetball"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-fill"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieDetailPage;
