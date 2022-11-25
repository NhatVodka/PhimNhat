import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import BasicMenu from "../basicMenu/BasicMenu";

const Header = () => {
  const { user } = useContext(AuthContext);
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

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
        <NavLink to="/">
            <li className="headerLink">Home</li>
          </NavLink>
          <NavLink to="/movies">
            <li className="headerLink">Movies</li>
          </NavLink>
          <NavLink to="/category">
            <li className="headerLink">Category</li>
          </NavLink>
          <NavLink to="/search">
            <li className="headerLink">Search</li>
          </NavLink>
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
        <NavLink to="/profile">
          <img
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
