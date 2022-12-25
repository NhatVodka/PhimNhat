import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import { createComment } from "../../contexts/commentContext/apiCalls";
import { CommentContext } from "../../contexts/commentContext/CommentContext";
import Comment from "../comment/Comment";

const Comments = ({ id }) => {
  const commentRef = useRef();
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(CommentContext);
  const [comments, setComment] = useState([]);
  const [newComment, setNewComment] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchComments = async () => {
    try {
      const res = await axios.get(`/comments/${id}`);
      setComment(res.data.reverse());
    } catch (error) {}
  };
  useEffect(() => {
    fetchComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setNewComment({ [e.target.name]: value, movieId: id });
  };

  const handleComment = (e) => {
    e.preventDefault();
    createComment(newComment, dispatch).then(() => {
      fetchComments();
      commentRef.current.value = "";
    });
  };
  return (
    <>
      <div>
        <div className="comment-section border-t-2 border-gray-700 ml-4 ">
          <h2 className="text-4xl mb-5 mt-5">Comment</h2>
          <div className="flex gap-5">
            <img
              className="w-10 h-10 rounded-full"
              src={
                user.profilePic ||
                "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              }
              alt=""
            />
            <form className="w-[400px] flex flex-col">
              <textarea
                ref={commentRef}
                className="h-15 w-full p-4 outline-none rounded text-black"
                type="text"
                placeholder="Write your comment"
                name="desc"
                onChange={(e) => handleChange(e)}
              />
                <button
                  onClick={(e) => handleComment(e)}
                  className="p-1 mt-4 text-sm border-2 self-end cursor-pointer hover:bg-white hover:text-primary rounded-sm"
                >
                  Send
                </button>
            </form>
          </div>
        </div>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              fetchComments={fetchComments}
            />
          ))}
      </div>
    </>
  );
};

export default Comments;
