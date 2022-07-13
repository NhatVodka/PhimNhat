const CategoryReducer = (state, action) => {
  switch (action.type) {
    // Get Movie Reducer
    case "GET_CATEGORY_START":
      return {
        category: [],
        isFetching: true,
        error: false,
      };
    case "GET_CATEGORY_SUCCESS":
      return {
        category: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_CATEGORY_FAILURE":
      return {
        category: [],
        isFetching: false,
        error: true,
      };
    // Create Category Reducer
    case "CREATE_CATEGORY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "CREATE_CATEGORY_SUCCESS":
      return {
        category: [...state.category, action.payload],
        isFetching: false,
        error: false,
      };
    case "CREATE_CATEGORY_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    // Update Category Reducer
    case "UPDATE_CATEGORY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "UPDATE_CATEGORY_SUCCESS":
      return {
        category: state.category.map(
          (item) => item._id === action.payload._id && action.payload
        ),
        isFetching: false,
        error: false,
      };
    case "UPDATE_CATEGORY_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    // Delete Category Reducer
    case "DELETE_CATEGORY_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "DELETE_CATEGORY_SUCCESS":
      return {
        category: state.category.filter((item) => item._id !== action.payload),
        isFetching: false,
        error: false,
      };
    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default CategoryReducer;
