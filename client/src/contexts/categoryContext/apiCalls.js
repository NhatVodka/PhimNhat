import axios from "axios";
import {
  createCategoryFailure,
  createCategoryStart,
  createCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
  updateCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
} from "./CategoryActions";

// Get Category
export const getCategory = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await axios.get("/category", {
      headers: {
        token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getCategorySuccess(res.data));
  } catch (error) {
    dispatch(getCategoryFailure());
  }
};

// Delete Category
export const deleteCategory = async (id, dispatch) => {
  dispatch(deleteCategoryStart());
  try {
    await axios.delete("/category/" + id, {
      headers: {
        token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteCategorySuccess(id));
  } catch (error) {
    dispatch(deleteCategoryFailure());
  }
};

// Create Movie
export const createCategory = async (category, dispatch) => {
  dispatch(createCategoryStart());
  try {
    const res = await axios.post("/category/", category, {
      headers: {
        token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createCategorySuccess(res.data));
  } catch (error) {
    dispatch(createCategoryFailure());
  }
};
// Update Category
export const updateCategory = async (id, category, dispatch) => {
  dispatch(updateCategoryStart());
  try {
    const res = await axios.put("/category/" + id, category, {
      headers: {
        token: "nhat " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateCategorySuccess(res.data));
  } catch (error) {
    dispatch(updateCategoryFailure());
  }
};
