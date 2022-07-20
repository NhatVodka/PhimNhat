const CommentReducer = (state, action) => {
  switch (action.type) {
    // Get Comment Reducer
    case "GET_COMMENTS_START":
      return {
        comments: [],
        isFetching: true,
        error: false,
      };
    case "GET_COMMENTS_SUCCESS":
      return {
        comments: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_COMMENTS_FAILURE":
      return {
        comments: [],
        isFetching: false,
        error: true,
      };
    // Create Comment Reducer
    case "CREATE_COMMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_COMMENT_SUCCESS":
      return {
        comments: [...state.comments, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_COMMENTS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    // Delete Comment Reducer
    case "DELETE_COMMENT_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_COMMENT_SUCCESS":
      return {
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "DELETE_COMMENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export default CommentReducer;
