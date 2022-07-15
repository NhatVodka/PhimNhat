import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { logout } from "../../contexts/authContext/AuthAction";

const Header = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [isScrolled, setIsScroled] = useState(false);

  window.onscroll = () => {
    setIsScroled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div
      className={
        isScrolled
          ? "flex items-center justify-between gap-8  top-0 fixed z-30 w-full bg-[#0b0b0b] h-16 px-10"
          : "flex items-center justify-between gap-8 top-0 fixed z-30 w-full h-16 px-10"
      }
    >
      <div className="flex items-center ">
        <NavLink to="/" className="text-primary font-bold text-3xl">
          PhimNhat
        </NavLink>
        <div className="flex gap-5 text-xl ml-5">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/category"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Category
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Movie
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "text-primary" : "")}
          >
            Search
          </NavLink>
          {user?.isAdmin === true && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "text-primary" : "")}
            >
              Dashboard
            </NavLink>
          )}
        </div>
      </div>
      {user ? (
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 rounded-md object-cover"
            src={
              user.profilePic ||
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
            alt="Profile of user"
          />
          <h2>{user.username}</h2>
          <div className="profile ">
            <ArrowDropDownIcon />
            <div className="options right-2">
              <button onClick={() => dispatch(logout())}>Log out</button>
            </div>
          </div>
        </div>
      ) : (
        <NavLink
          to="/login"
          className=" py-1 px-6 text-lg bg-primary hover:bg-[#db0510] rounded-sm font-medium z-30"
        >
          Sign in
        </NavLink>
      )}
    </div>
  );
};

export default Header;
