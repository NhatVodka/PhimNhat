import React from "react";
const PageNotFound = () => {
  return (
    <div className="bg-white w-full h-screen relative mt-16">
      <div className="flex items-center justify-center gap-5 absolute p-10 text-black top-[50%] left-[50%] -mt-[150px] -ml-[150px] ">
        <h1 className="text-2xl">404</h1>
        <h2 className="">This page could not be found</h2>
      </div>
    </div>
  );
};

export default PageNotFound;
