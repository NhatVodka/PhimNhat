import { Link } from "react-router-dom";

const MovieCard = ({ item }) => {
  const { poster_path, release_date, title, vote_average, _id } = item;

  return (
    <Link to={`/detail/${_id}`}>
      <div className="relative movies-card flex flex-col rounded-lg p-3 bg-slate-800  text-white h-full ">
        <img
          src={poster_path}
          alt=""
          className=" w-full h-[350px] object-cover rounded-lg mb-5  hover:scale-105 transition-all duration-300"
        />
        <div className="flex flex-col flex-1">
          <h3 className="text-xl font-bold mb-3 ">{title}</h3>
          <div className=" flex items-center justify-between text-sm  mb-auto">
            <span className="opacity-50">{release_date}</span>
            {vote_average !== null ? (
              <span className="absolute -left-1 top-5 bg-primary py-1 px-4  z-9999 font-bold rounded-md">
                {vote_average}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
