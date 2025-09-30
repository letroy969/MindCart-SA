import React from "react";
import ProductCard from "../components/ProductCard";

const Home = () => (
  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
    <ProductCard name="Apple" price="R10" />
    <ProductCard name="Banana" price="R5" />
    <ProductCard name="Milk" price="R25" />
  </div>
);

export default Home;
