import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import Header from "../../components/layout/Header";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [category, setCategory] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCategory = async () => {
    try {
      const res = await axios.get(`/category`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  // console.log(category);
  return (
    <Fragment>
      <Header></Header>
      <Banner></Banner>
      {category &&
        category.length > 0 &&
        category.map((item) => (
          <section
            key={item._id}
            className="movies-layout page-container pb-20"
          >
            <h2 className="mb-5 text-3xl capitalize text-white font-bold">
              {item.categoryName}
            </h2>
            <MovieList categoryName={item.categoryName}></MovieList>
          </section>
        ))}
    </Fragment>
  );
};

export default HomePage;
