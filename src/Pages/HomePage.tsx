import React from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../Pages/ProductsPage";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Sidebar />
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

export default HomePage;
