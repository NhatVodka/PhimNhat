import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import PublishIcon from "@mui/icons-material/Publish";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import storage from "../../Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { MovieContext } from "../../contexts/movieContext/MovieContext";
import { updateMovie } from "../../contexts/movieContext/apiCalls";
const Movie = () => {
  const { dispatch } = useContext(MovieContext);
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);
  const [poster_path, setPoster_Path] = useState(movie.poster_path);
  const [backdrop_path, setBackdrop_Path] = useState(movie.backdrop_path);
  const [trailer, setTrailer] = useState(movie.trailer);
  const [video, setVideo] = useState(movie.video);
  const [uploaded, setUploaded] = useState(0);
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
  }, [movieId]);
  const { title, genre, release_date, vote_average, _id } = movie;
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };
  const handleUpdate = (id) => {
    updateMovie(id, movie, dispatch);
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
            setUploaded((prev) => prev + 1);
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
        <div className="flex-[4] p-5 ">
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
                  {/* {genre &&
                    genre.length >= 0 &&
                    genre.map((item, index) => (
                      <span key={index} className="ml-3 text-black">
                        {item}
                      </span>
                    ))} */}
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
            <div className="flex-[2] p-5 shadow-lg ml-5">
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
                    <label className="mb-1 text-base ">Genre</label>
                    <input
                      type="text"
                      placeholder="Adventure Action"
                      className="border-b-2 outline-none w-[250px]"
                      name="genre"
                      onChange={handleChange}
                    />
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
                  <div className="flex items-center">
                    <img
                      className="w-[100px] h-[100px] rounded-lg object-cover mr-5"
                      src={movie.poster_path}
                      alt=""
                    />
                    <label htmlFor="file">
                      <PublishIcon className="cursor-pointer" />
                    </label>
                    <input style={{ display: "none" }} type="file" id="file" />
                  </div>
                  {uploaded === 5 ? (
                    <button
                      className="outlinie-none p-1 cursor-pointer rounded-md bg-blue-600 text-white "
                      onClick={() => handleUpdate(movieId)}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="outlinie-none p-1 cursor-pointer rounded-md bg-blue-600 text-white "
                      onClick={handleUpload}
                    >
                      Upload
                    </button>
                  )}
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
