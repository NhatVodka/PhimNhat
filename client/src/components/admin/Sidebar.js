import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import MovieIcon from "@mui/icons-material/Movie";
import LogoutIcon from "@mui/icons-material/Logout";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar flex-[1] min-h-screen  border-r-2 border-gray-300">
      <div className="top h-[50px] flex items-center justify-center">
        <Link to="/">
          <span className="logo text-xl font-bold text-purple-600">
            Dashboard
          </span>
        </Link>
      </div>
      <hr className="h-0  border-[0.5px] border-gray-300" />
      <div className="center">
        <ul>
          <p className="title">Dashboard</p>
          <Link to="/dashboard">
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title ">Quick Menu</p>
          <Link to="/usersAdmin">
            <li>
              <PersonIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/moviesAdmin">
            <li>
              <MovieIcon className="icon" />
              <span>Movies</span>
            </li>
          </Link>
          <Link to="/categoryAdmin">
            <li>
              <CategoryIcon className="icon" />
              <span>Category</span>
            </li>
          </Link>
          <Link to="/">
            <li>
              <LogoutIcon className="icon" />
              <span>Back</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
