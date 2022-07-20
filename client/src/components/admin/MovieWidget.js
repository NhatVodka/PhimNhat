import React from "react";
const MovieWidget = ({ pic, title, genre, date, status }) => {
  const Button = ({ type }) => {
    return <button className={"widgetButton " + type}>{type}</button>;
  };
  return (
    <>
      <tr>
        <td className="font-semibold">
          <img className="w-10 h-10 mr-3 object-cover" src={pic} alt="" />
        </td>
        <td>
          <span className="text-lg font-semibold mb-2">{title}</span>
        </td>
        <td>{genre}</td>
        <td>{date}</td>
        <td>
          <Button type={status} />
        </td>
      </tr>
    </>
  );
};

export default MovieWidget;
