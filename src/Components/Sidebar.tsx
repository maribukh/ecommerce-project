import React, { useState, useEffect } from "react";
import DropUp from "../assets/images/icons/DropUp.svg";

const Sidebar = ({
  activeFilters,
  onFilterChange,
  onAvailableFiltersUpdate,
}) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        if (!data.products) throw new Error("Invalid API response structure");
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        const uniqueBrands = Array.from(
          new Set(data.products.map((product) => product.brand))
        );
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
        onAvailableFiltersUpdate([...uniqueBrands, "4 star", "3 star"]);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [onAvailableFiltersUpdate]);

  const toggleSelection = (brand) => {
    const newFilters = activeFilters.includes(brand)
      ? activeFilters.filter((filter) => filter !== brand)
      : [...activeFilters, brand];
    onFilterChange(newFilters);
  };

  return (
    <aside style={styles.sidebar}>
      {/* Category Section */}
      <div style={styles.section}>
        <div style={styles.box}>
          <h2 style={styles.h2}>Category</h2>
          <img src={DropUp} alt="DropUp Icon" />
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
          <img src={DropUp} alt="DropUp Icon" />
        </div>
        <ul style={styles.ul}>
          {brands.map((brand) => (
            <li style={styles.li} key={brand}>
              <input
                type="checkbox"
                id={brand}
                checked={activeFilters.includes(brand)}
                onChange={() => toggleSelection(brand)}
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
