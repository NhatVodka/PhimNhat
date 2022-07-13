import React, { Fragment } from "react";
import Banner from "../../components/banner/Banner";
import Header from "../../components/layout/Header";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <Header></Header>
      <Banner></Banner>
      <section className="movies-layout page-container pb-20">
        <h2 className="mb-10 text-3xl capitalize text-white font-bold">
          Now Playing
        </h2>
        <MovieList categoryName="Now Playing"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="mb-10 text-3xl capitalize text-white font-bold">
          Top rated
        </h2>
        <MovieList categoryName="Top Rated"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="mb-10 text-3xl capitalize text-white font-bold">
          Trending
        </h2>
        <MovieList categoryName="Trending"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
