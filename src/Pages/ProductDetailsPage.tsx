import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.productDetailsContainer}>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={styles.productImage}
      />
      <p>{product.description}</p>
      <p>
        <strong>Price: </strong>${product.price}
      </p>
      <p>
        <strong>Rating: </strong>
        {product.rating} stars
      </p>
      <button style={styles.addToCartButton}>Add to Cart</button>
    </div>
  );
};

const styles = {
  productDetailsContainer: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  productImage: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
  },
  addToCartButton: {
    padding: "10px 20px",
    backgroundColor: "#0D6EFD",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProductDetailsPage;
