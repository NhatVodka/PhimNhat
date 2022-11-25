import React, { useEffect, useState } from "react";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../../atoms/modalAtom";
import {
  HandThumbUpIcon,
  InformationCircleIcon,
  PlusIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState([]);
  const [muted, setMuted] = useState(true);
  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!movie) return;
    if (movie?.trailer) {
      setTrailer(movie.trailer[0]);
    }
    if (movie?.genre) {
      setGenres(movie.genre);
    }
  }, [movie]);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6"></XMarkIcon>
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={trailer}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing
            muted={muted}
          ></ReactPlayer>
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <Link to={`/watch/${movie._id}`}>
                  <button className="h-full flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                    <FaPlay className="h-7 w-7 text-black" />
                      Play
                  </button>
              </Link>
              <Link to={`/detail/${movie._id}`}>
                <button
                  className="bannerButton bg-[gray]/70"
                  // onClick={() => {
                  //   setCurrentMovie(movie);
                  //   setShowModal(true);
                  // }}
                >
                  <InformationCircleIcon className="h-7 w-7 md:h-8 md:w-8" />
                  More Info
                </button>
              </Link>
              <button className="modalButton">
                <PlusIcon className="h-7 w-7" />
              </button>
            </div>

            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="h-6 w-6" />
              ) : (
                <SpeakerWaveIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className=" font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">{movie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-sm">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.desc}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.join(" ,")}
                </div>
                <div>
                  <span className="text-[gray]">Country: </span>
                  {movie?.country}
                </div>
                <div>
                  <span className="text-[gray]">Time: </span>
                  {movie?.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
