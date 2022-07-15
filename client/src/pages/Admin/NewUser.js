import React, { useContext, useState } from "react";
import Navbar from "../../components/admin/Navbar";
import Sidebar from "../../components/admin/Sidebar";
import storage from "../../Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext/UserContext";
import { createUser } from "../../contexts/userContext/apiCalls";

const NewUser = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [uploaded, setUploaded] = useState(0);

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
    createUser(user, dispatch);
    navigate("/usersAdmin/");
  };
  const storage = getStorage();
  const metadata = {
    contentType: "image/jpeg",
  };
  console.log(user);
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
          console.log("Upload is " + progress + " % done");
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
            {/* <div className="w-[400px] flex flex-col mt-4 mr-5 ">
              <label className="mb-3 text-base font-semibold text-gray-900">
                IsAdmin
              </label>
              <select
                className="h-9 border-2 border-gray-400 rounded text-black"
                name="isAdmin"
                onChange={handleChange}
              >
                <option className="p-4 text-black" value={Boolean(true)}>
                  Yes
                </option>
                <option className="p-4 text-black" value={false}>
                  No
                </option>
              </select>
            </div> */}
            <div className="w-[400px] flex flex-col mt-3 mr-5">
              <label className=" text-base font-semibold text-black">
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
              <div className="w-[400px] flex flex-col mt-5 mr-5">
                <button
                  className="w-[200px] outline-none bg-blue-800 text-white py-2 px-3 font-semibold rounded cursor-pointer "
                  onClick={handleUpload}
                >
                  Upload
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
