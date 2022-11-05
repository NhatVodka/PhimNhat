import { CheckIcon } from "@heroicons/react/24/solid";
import React, { useContext, useEffect, useState } from "react";
import { logout } from "../../contexts/authContext/AuthAction";
import { AuthContext } from "../../contexts/authContext/AuthContext";
import Table from "../../components/Table/Table";
import Loading from "../../components/Loading/Loading";
import payments, { loadCheckout } from "../../lib/stripe";
import { getProducts } from "@stripe/firestore-stripe-payments";
const Plan = () => {
  const { dispatch, user } = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isBillingLoading, setBillingLoading] = useState(false);

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
  const subscribeToPlan = () => {
    if (!user) return;
    loadCheckout(selectedPlan?.prices[0]?.id);
    setBillingLoading(true);
  };
  return (
    <div>
      <header className="border-b border-white/10 bg-[#141414]">
        <h1 className=" text-[#e50914] font-bold text-5xl cursor-pointer object-contain md:left-10 md:top-6">
          PhimNhat
        </h1>
        <button
          className="text-lg font-light hover:underline"
          onClick={() => dispatch(logout())}
        >
          Sign Out
        </button>
      </header>

      <main className="pt-28 mx-auto max-w-5xl px-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>

        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {products &&
              products.map((product) => (
                <div
                  className={`planBox ${
                    selectedPlan?.id === product.id
                      ? "opacity-100"
                      : "opacity-60"
                  }`}
                  onClick={() => setSelectedPlan(product)}
                  key={product.id}
                >
                  {product.name}
                </div>
              ))}
          </div>
          <Table products={products} selectedPlan={selectedPlan} />
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loading color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plan;
