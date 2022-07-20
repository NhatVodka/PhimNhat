import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { fetcher } from "../../config";

const MovieCredit = () => {
  const { id } = useParams();
  const { data } = useSWR(`${id ? `/movies/${id}` : ""}`, fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length < 0) return null;
  return (
    <>
      <h2 className=" text-3xl mb-10 ">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.map((item) => (
          <div className="cast-item" key={item}>
            <img
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              src={item}
              alt=""
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieCredit;
