import React, { useState, useEffect } from "react";
import DropUp from "../assets/images/icons//DropUp.svg";

const Sidebar: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Fetch data from the server
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {

        const uniqueCategories = Array.from(
          new Set(data.products.map((product: any) => product.category))
        );
        const uniqueBrands = Array.from(
          new Set(data.products.map((product: any) => product.brand))
        );
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const toggleSelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((el) => el !== item) : [...prev, item]
    );
  };

  return (
    <aside style={styles.sidebar}>
      {/* Category Section */}
      <div style={styles.section}>
        <div style={styles.box}>
          <h2 style={styles.h2}>Category</h2>
          <img src={DropUp} alt="" />
        </div>
        <ul style={styles.ul}>
          {categories.map((category) => (
            <li style={styles.li} key={category}>
              {category}
            </li>
          ))}
          <li style={styles.li}>
            <a href="#" style={styles.link}>
              See all
            </a>
          </li>
        </ul>
      </div>

      {/* Brands Section */}
      <div style={styles.section}>
        <div style={styles.box}>
          <h2 style={styles.h2}>Brands</h2>
          <img src={DropUp} alt="" />
        </div>
        <ul style={styles.ul}>
          {brands.map((brand) => (
            <li style={styles.li} key={brand}>
              <input
                type="checkbox"
                id={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  toggleSelection(selectedBrands, setSelectedBrands, brand)
                }
              />
              <label htmlFor={brand} style={styles.label}>
                {brand}
              </label>
            </li>
          ))}
          <li style={styles.li}>
            <a href="#" style={styles.link}>
              See all
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "240px",
    paddingLeft: "132px",
    overflowY: "auto" as const,
  },
  section: {
    marginBottom: "20px",
  },
  box: {
    borderTop: "1px solid #DEE2E7",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  h2: {
    fontSize: "16px",
    color: "#333",
    margin: "0",
    padding: "15px 0px",
  },
  ul: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  li: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  label: {
    marginLeft: "8px",
    color: "#333",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
};

export default Sidebar;
