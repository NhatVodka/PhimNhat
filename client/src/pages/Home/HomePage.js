import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Banner from "../../components/banner/Banner";
import Header from "../../components/layout/Header";
import Modal from "../../components/modal/Modal";
import MovieList from "../../components/MovieList/MovieList";
const HomePage = () => {
  const showModal = useRecoilValue(modalState);
  const [category,setCategory] = useState([]);
  const getCategory = async () => {
    try {
      const res = await axios.get(`/category`)
      setCategory(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div
      className={`relative h-screen bg-gradient-to-blg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y24 lg:pl-16">
        <Banner />
        <section className=" md:space-y-24">
        {category && category?.length > 0 && category.map((item) => (
          <MovieList key={item._id} title={item.categoryName} />
        ))}
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default HomePage;
