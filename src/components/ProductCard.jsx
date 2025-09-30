import React from "react";

const ProductCard = ({ name, price }) => (
  <div className="border rounded p-4 shadow hover:shadow-lg transition">
    <h2 className="text-lg font-semibold">{name}</h2>
    <p className="text-gray-700">{price}</p>
  </div>
);

export default ProductCard;
