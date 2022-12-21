import React, { useContext, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../../contexts/movieContext/MovieContext";
import { createMovie } from "../../contexts/movieContext/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@mui/material/LinearProgress';
const NewMovie = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(MovieContext);

  const [movie, setMovie] = useState(null);
  const [poster_path, setPoster_Path] = useState(null);
  const [backdrop_path, setBackdrop_Path] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [cast, setCast] = useState(null);
  const [progress, setProgress] = React.useState(0);
  const showToastMessage = () => {
    toast.success('Add NewMovie Successfully!!', {
      position: toast.POSITION.TOP_RIGHT
    });
};
  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setMovie({ ...movie, [e.target.name]: value });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: poster_path, label: "poster_path" },
      { file: backdrop_path, label: "backdrop_path" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
      { file: cast, label: "cast" },
    ]);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    showToastMessage();
    createMovie(movie, dispatch);
    setTimeout(() => {
      navigate("/moviesAdmin");
    },3000)
  };
  // Firebase configs
  const storage = getStorage();
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item?.file?.name;
      const storageRef = ref(storage, "/items/" + fileName);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress)
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
    <>
    <div className="flex bg-white">
      <Sidebar />
      <div className="flex-[4]">
        <Navbar />
        <div className="p-5 text-black">
          <h1 className="text-2xl font-bold">New Movie</h1>
          <form className="flex flex-wrap gap-5 text-black">
            <div className="w-[400px] flex flex-col mt-3">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Title
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="text"
                placeholder="John Smith"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Release_Date
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="text"
                placeholder="2022"
                name="release_date"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Desc
              </label>
              <input
                className=" h-[100px] p-4 border-2 border-gray-400 rounded"
                type="email"
                placeholder="JohnSmith1@gmail.com"
                name="desc"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3 ">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Genre
              </label>
              <select
                multiple
                className="h-[100px] border-2 border-gray-400 rounded text-black"
                name="genre"
                onChange={handleSelect}
              >
                <option value="Romance">Romance</option>
                <option value="Animation">Animation</option>
                <option value="Adventure">Adventure</option>
                <option value="Drama">Drama</option>
                <option value="Action">Action</option>
                <option value="Crime">Crime</option>
                <option value="Family">Family</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Thriller">Thriller</option>
                <option value="ComeScience Fictiondy">Science Fiction</option>
                <option value="Music">Music</option>
                <option value="Mystery">Mystery</option>
              </select>
            </div>
            <div className="w-[400px] flex flex-col mt-3 ">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Rating
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="text"
                placeholder="7.5"
                name="vote_average"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3 ">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Time
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="text"
                placeholder="100"
                name="time"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-[400px] mt-3">
              <label className="mb-1 text-lg text-gray-900 ">Poster</label>
              <input
                type="file"
                className="outline-none"
                name="poster_path"
                onChange={(e) => setPoster_Path(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col w-[400px]  mt-3">
              <label className="mb-1 text-lg  text-gray-900">Backdrop</label>
              <input
                type="file"
                className="outline-none"
                name="backdrop_path"
                onChange={(e) => setBackdrop_Path(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col w-[400px]  mt-3">
              <label className="mb-1 text-lg text-gray-900 ">Casts</label>
              <input
                type="file"
                className="outline-none"
                name="cast"
                onChange={(e) => setCast(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="mb-1 text-lg text-gray-900 ">Trailer</label>
              <input
                type="file"
                className="outline-none w-[400px]"
                name="trailer"
                onChange={(e) => setTrailer(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="mb-1 text-lg text-gray-900">Video</label>
              <input
                multiple
                type="file"
                className="outline-none w-[400px]"
                name="video"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </div>
            <div className="flex mt-5">
              <div className="mt-3 mr-10 ">
                <button
                  className="w-[100px] outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
              <div className=" mt-3 ">
                <button
                  className="w-[100px] outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                  onClick={(e) => handleCreate(e)}
                >
                  Create
                </button>
              </div>
            </div>
          </form>
          {progress && progress < 100 ? (
            <LinearProgress className="mt-6" variant="determinate" value={progress} />
          ) : ('')
          }
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default NewMovie;
