import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts(10, 0);
      setProducts(data.products);
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: any) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
