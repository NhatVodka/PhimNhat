import React from "react";
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
        <iframe
          width="885"
          height="498"
          src={`https://www.youtube.com/embed/${video}`}
          title="YOU'RE TOO LITTLE BOY! We Invaded D1 School Full of TRASH TALKERS!! 5v5 ECS Streetball"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full h-full object-fill"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default WatchMovie;
