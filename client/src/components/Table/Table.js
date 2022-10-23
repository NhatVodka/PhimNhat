import { CheckIcon } from "@heroicons/react/24/solid";
import React from "react";

const Table = ({ products, selectedPlan }) => {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {products?.length &&
            products.map((product) => (
              <td
                className={`tableDataFeature ${
                  selectedPlan && selectedPlan.id === product.id
                    ? "text-[#e50914]"
                    : "text-[gray]"
                }`}
                key={product.id}
              >
                {product.prices[0].unit_amount / 100}USD
              </td>
            ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video Quality</td>
          {products?.length &&
            products.map((product) => (
              <td
                className={`tableDataFeature ${
                  selectedPlan && selectedPlan.id === product.id
                    ? "text-[#e50914]"
                    : "text-[gray]"
                }`}
                key={product.id}
              >
                {product.metadata.videoQuality}
              </td>
            ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products &&
            products.map((product) => (
              <td
                className={`tableDataFeature ${
                  selectedPlan?.id === product.id
                    ? "text-[#E50914]"
                    : "text-[gray]"
                }`}
                key={product.id}
              >
                {product.metadata.resolution}
              </td>
            ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products &&
            products.map((product) => (
              <td
                className={`tableDataFeature ${
                  selectedPlan?.id === product.id
                    ? "text-[#E50914]"
                    : "text-[gray]"
                }`}
                key={product.id}
              >
                {products && product.metadata.portability === "true" && (
                  <CheckIcon className="inline-block h-8 w-8" />
                )}
              </td>
            ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
