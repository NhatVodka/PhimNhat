import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { poster_path } = movie;

  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <img
        src={poster_path}
        className="rounded-sm object-cover md:rounded h-[144px] w-[260px]"
        alt="thumbnail"
      />
    </div>
  );
};

export default MovieCard;
