import React from "react";

const ProductsCard: React.FC = () => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Product Title</h2>
      <p style={styles.description}>Short description of the product</p>
      <p style={styles.price}>$99.99</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 8px 0",
  },
  description: {
    fontSize: "14px",
    color: "#8B96A5",
    margin: "0 0 12px 0",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default ProductsCard;
