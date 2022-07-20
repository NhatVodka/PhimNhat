import axios from "axios";
import {
  createCommentFailure,
  createCommentStart,
  createCommentSuccess,
  deleteComemntSuccess,
  deleteCommentFailure,
  deleteCommentStart,
  getCommentsFailure,
  getCommentsStart,
  getCommentsSuccess,
} from "./CommentActions";

// Get Comments of one Movie
export const getComments = async (id, dispatch) => {
  dispatch(getCommentsStart());
  try {
    const res = await axios.get("/comments/" + id, {
      headers: {
        token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getCommentsSuccess(res.data));
  } catch (error) {
    dispatch(getCommentsFailure());
  }
};

// Create Comments
export const createComment = async (comment, dispatch) => {
  dispatch(createCommentStart());
  try {
    const res = await axios.post("/comments/", comment, {
      headers: {
        token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createCommentSuccess(res.data));
  } catch (error) {
    dispatch(createCommentFailure());
  }
};

//Delete Comment
export const deleteComment = async (id, dispatch) => {
  dispatch(deleteCommentStart());
  try {
    await axios.delete("/comments/" + id, {
      headers: {
        token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteComemntSuccess(id));
  } catch (error) {
    alert(error.response.data);
    dispatch(deleteCommentFailure());
  }
};
