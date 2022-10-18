import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtom";

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const { poster_path } = movie;

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <img
        src={poster_path}
        className="rounded-sm object-cover md:rounded h-[144px] w-[260px]"
        alt="thumbnail"
      />
    </div>
  );
};

export default MovieCard;
