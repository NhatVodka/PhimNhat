import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
const WidGetSmall = () => {
  const [newUsers, setNewUsers] = useState([]);
  const getNewUSer = async () => {
    try {
      const res = await axios.get(`/users?new=true`, {
        headers: {
          token:
            "nhat eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjJiOGY0MzQ1ZTY3YzQ4YTU4MjM5NiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODI5Njc2MCwiZXhwIjoxNjU4NzI4NzYwfQ.Tnp1gOkhVWN5M8JZgEKudZwVtgzT0X5x5d4J4rslzuY",
        },
      });
      setNewUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNewUSer();
  }, []);

  return (
    <div className="widgetSm flex-[1] shadow-lg  p-5 mr-5 text-black">
      <span className="text-3xl font-semibold">New join members</span>
      <ul className="m-0 p-0 ">
        {newUsers.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between my-5 mx-0 "
          >
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={
                user.profilePic ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt="User"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{user.username}</span>
            </div>
            <button className="flex items-center rounded-md py-2 px-3 bg-[#eeeef7] text-gray-500 cursor-pointer">
              <VisibilityIcon className="text-base mr-1" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidGetSmall;
