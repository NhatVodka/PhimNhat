import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { fetcher } from "../../config";

const MovieTrailer = () => {
  const { id } = useParams();
  const { data } = useSWR(`${id ? `/movies/${id}` : ""}`, fetcher);
  if (!data) return null;
  const { trailer } = data;
  if (!trailer || trailer.length <= 0) return null;
  return (
    <>
      <div className="py-10">
        <h1 className="text-3xl mb-6">Trailer</h1>
        <div className="grid grid-cols-2 gap-10">
          {trailer.map((item) => (
            <div className="" key={item}>
              <div key={item.id} className="w-full aspect-video">
                <iframe
                  width="885"
                  height="498"
                  src={
                    item.includes("/watch?v=")
                      ? item.replace("/watch?v=", "/embed/")
                      : item
                  }
                  title="YOU'RE TOO LITTLE BOY! We Invaded D1 School Full of TRASH TALKERS!! 5v5 ECS Streetball"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full object-fill"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MovieTrailer;
