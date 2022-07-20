import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { MovieContext } from "../../contexts/movieContext/MovieContext";
import { updateMovie } from "../../contexts/movieContext/apiCalls";
const Movie = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(MovieContext);
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [poster_path, setPoster_Path] = useState(movie.poster_path);
  const [backdrop_path, setBackdrop_Path] = useState(movie.backdrop_path);
  const [trailer, setTrailer] = useState(movie.trailer);
  const [video, setVideo] = useState(movie.video);
  const getMovies = async () => {
    try {
      const res = await axios.get(`/movies${movieId ? `/${movieId}` : ""}`, {
        headers: {
          token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
        },
      });
      setMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
  const { title, genre, release_date, vote_average, _id } = movie;
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setMovie({ ...movie, [e.target.name]: value });
  };
  const handleUpdate = (e, id) => {
    e.preventDefault();
    updateMovie(id, movie, dispatch);
    navigate("/moviesAdmin");
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: poster_path, label: "poster_path" },
      { file: backdrop_path, label: "backdrop_path" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
  };
  // Firebase configs
  const storage = getStorage();
  const metadata = {
    contentType: "image/jpeg",
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);
      uploadTask.on(
        "state changed",
        (snapshot) => {
          const progress = Math.trunc(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Upload is " + progress + " % done");
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
          });
        }
      );
    });
  };
  return (
    <div className="flex bg-white ">
      <Sidebar />
      <div className="flex-[6]">
        <Navbar />
        <div className="flex-[4] p-5 text-black">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Edit Movie</h1>
          </div>
          <div className="flex mt-5">
            <div className="flex-[1] p-5 shadow-lg">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={movie.poster_path}
                  alt=""
                />
                <div className="flex flex-col ml-3">
                  <span className="font-semibold text-lg">{title}</span>
                </div>
              </div>
              <div className="flex flex-col mt-3 tetx-xl">
                <span className="text-lg font-semibold text-gray-500">
                  Movie Details
                </span>
                <div className="my-5 mx-0 text-gray-400">
                  <span className="ml-3 text-black">ID : {_id}</span>
                </div>
                <div className="my-5 mx-0 text-gray-400">
                  <span className="ml-3 text-black">Title: {title}</span>
                </div>
                <div className="my-5 mx-0">
                  <span className="text-black ml-3 ">Genre:</span>
                  {genre}
                </div>
                <div className="my-5 mx-0 text-gray-400">
                  <span className="ml-3 text-black">Year: {release_date}</span>
                </div>
                <div className="my-5 mx-0 text-gray-400">
                  <span className="ml-3 text-black">
                    Rating: {vote_average}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-[2] p-5 shadow-lg ml-5 text-black">
              <span className="text-2xl font-bold">Edit</span>
              <form className="flex justify-between mt-5">
                <div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Title</label>
                    <input
                      type="text"
                      placeholder={title}
                      className="border-b-2 outline-none w-[250px]"
                      name="title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-3 text-base font-semibold text-gray-900">
                      Genre
                    </label>
                    <select
                      multiple
                      className="h-[150px] border-2 border-gray-400 rounded text-black"
                      name="genre"
                      onChange={handleSelect}
                    >
                      <option value="Romance">Romance</option>
                      <option value="Animation">Animation</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Drama">Drama</option>
                      <option value="Action">Action</option>
                      <option value="Crime">Crime</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Family">Family</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Horror">Horror</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Thriller">Mystery</option>
                      <option value="Science Fiction">Science Fiction</option>
                    </select>
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Year</label>
                    <input
                      type="text"
                      placeholder={release_date}
                      className="border-b-2 outline-none w-[250px]"
                      name="release_date"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Rating</label>
                    <input
                      type="text"
                      placeholder={vote_average}
                      className="border-b-2 outline-none w-[250px]"
                      name="vote_average"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Poster</label>
                    <input
                      type="file"
                      className="border-b-2 outline-none w-[250px]"
                      name="poster_path"
                      onChange={(e) => setPoster_Path(e.target.files[0])}
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Backdrop</label>
                    <input
                      type="file"
                      className="border-b-2 outline-none w-[250px]"
                      name="backdrop_path"
                      onChange={(e) => setBackdrop_Path(e.target.files[0])}
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Trailer</label>
                    <input
                      type="file"
                      placeholder={trailer}
                      className="border-b-2 outline-none w-[250px]"
                      name="trailer"
                      onChange={(e) => setTrailer(e.target.files[0])}
                    />
                  </div>
                  <div className="flex flex-col mt-3">
                    <label className="mb-1 text-base ">Video</label>
                    <input
                      type="file"
                      placeholder={video}
                      className="border-b-2 outline-none w-[250px]"
                      name="video"
                      onChange={(e) => setVideo(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <img
                      className="w-[100px] h-[100px] rounded-lg object-cover mr-5"
                      src={movie.poster_path}
                      alt=""
                    />
                  </div>
                  <div>
                    <button
                      className="outlinie-none p-1 cursor-pointer rounded-md bg-blue-600 text-white mr-3 "
                      onClick={(e) => handleUpdate(e, movieId)}
                    >
                      Update
                    </button>
                    <button
                      className="outlinie-none p-1 cursor-pointer rounded-md bg-blue-600 text-white "
                      onClick={(e) => handleUpload(e)}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
