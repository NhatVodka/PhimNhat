import CategoryReducer from "./CategoryReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  category: [],
  isFetching: false,
  error: false,
};

export const CategoryContext = createContext(INITIAL_STATE);

export const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CategoryReducer, INITIAL_STATE);

  return (
    <CategoryContext.Provider
      value={{
        category: state.category,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
