import React, { useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import Banner from "../../components/banner/Banner";
import Header from "../../components/layout/Header";
import Modal from "../../components/modal/Modal";
import MovieList from "../../components/MovieList/MovieList";
import Plan from "../Plan/Plan";
import { getProducts } from "@stripe/firestore-stripe-payments";
import payments from "../../lib/stripe";
import useSubscription from "../../hooks/useSubscription";
import { AuthContext } from "../../contexts/authContext/AuthContext";
const HomePage = () => {
  const { user } = useContext(AuthContext);
  const showModal = useRecoilValue(modalState);

  const subscription = useSubscription(user);
  console.log(subscription);

  const [products, setProducts] = useState(null);
  const getProductData = async () => {
    try {
      const res = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
      });
      setProducts(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);

  if (!subscription) return <Plan products={products} />;

  return (
    <div
      className={`relative h-screen bg-gradient-to-blg:h-[140vh] ${
        showModal && "!h-screen overflow-hidden"
      }`}
    >
      <Header></Header>
      <main className="relative pl-4 pb-24 lg:space-y24 lg:pl-16">
        <Banner />
        <section className=" md:space-y-24">
          <MovieList title="Now Playing" />
          <MovieList title="Top Rated" />
          <MovieList title="Popular" />
          {/* My List */}
          {/* {list.length > 0 && <MovieList title="My List" movies={list} />} */}

          <MovieList title="Upcoming" />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
};

export default HomePage;
