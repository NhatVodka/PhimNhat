import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteComment } from "../../contexts/commentContext/apiCalls";
import { CommentContext } from "../../contexts/commentContext/CommentContext";

const Comment = ({ comment, fetchComments }) => {
  const [userComment, setUserComment] = useState({});
  console.log(comment);
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
  return (
    <>
      <div className="flex items-center m-5 gap-5 ml-4">
        <img
          className="w-10 h-10 rounded-full mt-5"
          src={userComment.profilePic}
          alt=""
        />
        <div className="flex flex-col gap-2 mt-5 ">
          <div className="flex justify-between w-[400px]">
            <h2>{userComment.username}</h2>
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
