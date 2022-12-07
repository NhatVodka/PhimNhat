import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../config";

const WatchMovie = () => {
  const { id } = useParams();
  const { data } = useSWR(`${id ? `/movies/${id}` : ""}`, fetcher);
  if (!data) return null;
  const { video } = data;
  return (
    <div className="text-3xl text-white">
      <div className="w-full h-screen aspect-video">
        {/* <video src={video} className="w-full h-screen"></video> */}
        <ReactPlayer url={video} controls={true} width="100%" height="100%" />
      </div>
    </div>
  );
};

export default WatchMovie;
