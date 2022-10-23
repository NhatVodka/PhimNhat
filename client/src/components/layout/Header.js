import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { logout } from "../../contexts/authContext/AuthAction";

const Header = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={`${isScroll && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <NavLink to="/" className="text-primary font-bold text-3xl">
          PhimNhat
        </NavLink>

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
          {user?.isAdmin === true && (
            <NavLink to="/dashboard" className="headerLink">
              Dashboard
            </NavLink>
          )}
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <MagnifyingGlassIcon className="hidden sm:inline  h-6 w-6" />
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <NavLink to="/login">
          <img
            onClick={() => dispatch(logout())}
            src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
            alt=""
            className="cursor-pointer rounded"
          />
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
