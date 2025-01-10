import React from "react";
import Sidebar from "../Components/Sidebar";
import ProductCard from "../Components/ProductCard";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Sidebar activeFilters={undefined} onFilterChange={undefined} onAvailableFiltersUpdate={undefined} />
      <div className="content">
        <h1></h1>
        <div className="products">
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const products = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },

  ];

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} id={product.id} name={product.name} />
      ))}
    </div>
  );
};

export default HomePage;
