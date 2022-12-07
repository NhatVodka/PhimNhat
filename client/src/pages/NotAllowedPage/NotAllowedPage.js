import React from "react";
import { Link } from "react-router-dom";

const NotAllowedPage = () => {
  return (
    <>
      <div className="relative">
        <h1 className="absolute top-[100px] left-10 text-lg tracking-wide">
          Sorry, You are not allowed to access this page at this time. Please{" "}
          <Link className="text-red-500" to="/login">
            Login
          </Link>{" "}
          to use our service.
        </h1>
      </div>
    </>
  );
};

export default NotAllowedPage;
