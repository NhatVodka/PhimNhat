import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteComment } from "../../contexts/commentContext/apiCalls";
import { CommentContext } from "../../contexts/commentContext/CommentContext";
import Rating from '@mui/material/Rating';
const Comment = ({ comment, fetchComments,rating }) => {
  console.log(rating)
  const [userComment, setUserComment] = useState({});
  const { dispatch } = useContext(CommentContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserComment = async () => {
    try {
      const res = await axios.get(`/users/${comment.userId}`);
      setUserComment(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.userId]);
  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteComment(id, dispatch).then(() => {
      fetchComments();
    });
  };
  const [yyyy, mm, dd] = comment.createdAt.split(/[/:\-T]/);
  return (
    <>
      <div className="flex items-center m-5 gap-5 ml-4">
        <img
          className="w-10 h-10 rounded-full mt-5"
          src={
            userComment.profilePic ||
            "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          }
          alt=""
        />
        <div className="flex flex-col gap-2 mt-5 ">
          <div className="flex justify-between w-[400px]">
            <div className="flex gap-5">
              <h2>{userComment.username}</h2>
              <p className=" opacity-70">{`${mm}/${dd}/${yyyy}`}</p>
            </div>
            <Rating
                  name="simple-controlled"
                  value={rating}
                  disabled
                />
            <button
              onClick={(e) => handleDelete(e, comment._id)}
              className="text-base font-bold"
            >
              x
            </button>
          </div>
          <h2>{comment.desc}</h2>
        </div>
      </div>
    </>
  );
};

export default Comment;
