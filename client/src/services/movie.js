import axios from "axios";

export const fetchMovie = async () => {
  try {
    const res = await axios.get(`movies/`, {
      headers: {
        token: "nhat" + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
