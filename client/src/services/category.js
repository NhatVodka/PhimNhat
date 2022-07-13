import axios from "axios";

export const fetchCategory = async (params) => {
  try {
    const res = await axios.get(
      `category${params ? `?categoryName=${params}` : ""}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
