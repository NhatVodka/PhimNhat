// Get Comments
export const getCommentsStart = () => ({
  type: "GET_COMMENTS_START",
});
export const getCommentsSuccess = (comments) => ({
  type: "GET_COMMENTS_SUCCESS",
  payload: comments,
});
export const getCommentsFailure = () => ({
  type: "GET_COMMENTS_FAILURE",
});

// Create Comment
export const createCommentStart = () => ({
  type: "CREATE_COMMENT_START",
});
export const createCommentSuccess = (comment) => ({
  type: "CREATE_COMMENT_SUCCESS",
  payload: comment,
});
export const createCommentFailure = () => ({
  type: "CREATE_COMMENTS_FAILURE",
});

// Delete Comment
export const deleteCommentStart = () => ({
  type: "DELETE_COMMENT_START",
});
export const deleteComemntSuccess = (id) => ({
  type: "DELETE_COMMENT_SUCCESS",
  payload: id,
});
export const deleteCommentFailure = (error) => ({
  type: "DELETE_COMMENT_FAILURE",
  payload: error,
});
