// Get Movie
export const getCategoryStart = () => ({
  type: "GET_CATEGORY_START",
});
export const getCategorySuccess = (category) => ({
  type: "GET_CATEGORY_SUCCESS",
  payload: category,
});
export const getCategoryFailure = () => ({
  type: "GET_CATEGORY_FAILURE",
});

// Delete Category
export const deleteCategoryStart = () => ({
  type: "DELETE_CATEGORY_START",
});
export const deleteCategorySuccess = (id) => ({
  type: "DELETE_CATEGORY_SUCCESS",
  payload: id,
});
export const deleteCategoryFailure = () => ({
  type: "DELETE_CATEGORY_FAILURE",
});

// Create Category
export const createCategoryStart = () => ({
  type: "CREATE_CATEGORY_START",
});
export const createCategorySuccess = (category) => ({
  type: "CREATE_CATEGORY_SUCCESS",
  payload: category,
});
export const createCategoryFailure = () => ({
  type: "CREATE_CATEGORY_FAILURE",
});
// Update Category
export const updateCategoryStart = () => ({
  type: "UPDATE_CATEGORY_START",
});
export const updateCategorySuccess = (category) => ({
  type: "UPDATE_CATEGORY_SUCCESS",
  payload: category,
});
export const updateCategoryFailure = () => ({
  type: "UPDATE_CATEGORY_FAILURE",
});
