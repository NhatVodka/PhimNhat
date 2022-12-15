import React, { useContext, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import storage from "../../Firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext/UserContext";
import { createUser } from "../../contexts/userContext/apiCalls";
import LinearProgress from '@mui/material/LinearProgress';
const NewUser = () => {
  const showToastMessage = () => {
    toast.success('Add NewUser Successfully!!', {
      position: toast.POSITION.TOP_RIGHT
    });
};
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [progress, setProgress] = React.useState(0);
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    upload([{ file: profilePic, label: "profilePic" }]);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    showToastMessage();
    createUser(user, dispatch);
    setTimeout(() => {
      navigate("/usersAdmin/");
    },3000)
  };
  const storage = getStorage();
  const metadata = {
    contentType: "image/jpeg",
  };
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file, metadata);
      uploadTask.on(
        "state changed",
        (snapshot) => {
          const progress = Math.trunc(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress)
        },
        (err) => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setUser((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
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
        <div className="p-5">
          <h1>New User</h1>
          <form className="flex flex-wrap text-black">
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Username
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="text"
                placeholder="John"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Email
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="email"
                placeholder="abc@gmail.com"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-3 text-base font-semibold text-gray-900">
                Password
              </label>
              <input
                className="h-5 p-4 border-2 border-gray-400 rounded"
                type="password"
                placeholder="abcxyz..."
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className="mb-[15px] text-base font-semibold text-black">
                Profile Pic
              </label>
              <input
                className="h-10 outline-none  rounded text-black"
                type="file"
                name="profilePic"
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </div>

            {uploaded === 1 ? (
              <div className="w-[400px] flex flex-col mt-3 mr-5">
                <button
                  className="w-[200px] outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                  onClick={handleCreate}
                >
                  Create
                </button>
              </div>
            ) : (
              <div className="w-[400px] flex flex-col mt-3 mr-5">
                <button
                  className="w-[200px] outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            )}
          </form>
          {progress && progress < 100 ? (
            <LinearProgress variant="determinate" value={progress} />
          ) : ('')
          }
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default NewUser;
