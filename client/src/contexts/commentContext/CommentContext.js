import { createContext, useReducer } from "react";
import CommentReducer from "./CommentReducer";

const INITIAL_STATE = {
  comments: [],
  isFetching: false,
  error: "",
};

export const CommentContext = createContext(INITIAL_STATE);

export const CommentContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CommentReducer, INITIAL_STATE);

  return (
    <CommentContext.Provider
      value={{
        comments: state.comments,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
