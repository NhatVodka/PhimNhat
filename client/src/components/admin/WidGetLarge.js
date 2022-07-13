import React from "react";
import MovieWidget from "./MovieWidget";
import "./widgetLg.scss";
const WidGetLarge = () => {
  return (
    <div className="widgetLg flex-[2] shadow-lg p-5">
      <h3 className="text-2xl font-bold">Latest Movie</h3>
      <table className="w-full h-full border-spacing-5">
        <tbody>
          <tr>
            <th className=" text-left">Movie</th>
            <th className=" text-left">Title</th>
            <th className=" text-left">Genre</th>
            <th className=" text-left">Date</th>
            <th className=" text-left">Status</th>
          </tr>
          <MovieWidget
            pic="https://upload.wikimedia.org/wikipedia/vi/a/a7/Batman_Lee.png"
            title="Batmandsadasdsasadasdsad"
            genre="Action,Adventure"
            date="29-6-2022"
            status="Approved"
          ></MovieWidget>
          <MovieWidget
            pic="https://upload.wikimedia.org/wikipedia/vi/a/a7/Batman_Lee.png"
            title="Batman"
            genre="Action,Adventure"
            date="29-6-2022"
            status="Pending"
          ></MovieWidget>
          <MovieWidget
            pic="https://upload.wikimedia.org/wikipedia/vi/a/a7/Batman_Lee.png"
            title="Batman"
            genre="Action,Adventure"
            date="29-6-2022"
            status="Pending"
          ></MovieWidget>
          <MovieWidget
            pic="https://upload.wikimedia.org/wikipedia/vi/a/a7/Batman_Lee.png"
            title="Batman"
            genre="Action,Adventure"
            date="29-6-2022"
            status="Declined"
          ></MovieWidget>
        </tbody>
      </table>
    </div>
  );
};

export default WidGetLarge;
