import React, { useState, useEffect } from "react";
import DropUp from "../assets/images/icons/DropUp.svg";
import DropDown from "../assets/images/icons/DropDown.svg";

const Sidebar = ({
  activeFilters,
  onFilterChange,
  onAvailableFiltersUpdate,
}: any) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState(false);
  const [expandedBrands, setExpandedBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  useEffect(() => {
    // Fetch products to get categories and brands
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        console.log("Products data:", data);
        if (!data.products) throw new Error("Invalid API response structure");

        const uniqueCategories = Array.from(
          new Set(
            data.products.map(
              (product: { category: string }) => product.category
            )
          )
        );
        setCategories(uniqueCategories);

        const uniqueBrands = Array.from(
          new Set(
            data.products.map((product: { brand: string }) => product.brand)
          )
        );
        setBrands(uniqueBrands);

        onAvailableFiltersUpdate([...uniqueBrands, "4 star", "3 star"]);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [onAvailableFiltersUpdate]);

  const toggleSelection = (filter: string) => {
    const newFilters = activeFilters.includes(filter)
      ? activeFilters.filter((f: string) => f !== filter)
      : [...activeFilters, filter];
    onFilterChange(newFilters);
  };

  const toggleCategoryVisibility = () => {
    setExpandedCategories(!expandedCategories);
  };

  const toggleBrandVisibility = () => {
    setExpandedBrands(!expandedBrands);
  };

  const handleShowAllCategories = (event: React.MouseEvent) => {
    event.preventDefault(); 
    setShowAllCategories((prev) => !prev); 
  };

  const handleShowAllBrands = (event: React.MouseEvent) => {
    event.preventDefault();
    setShowAllBrands((prev) => !prev); 
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.section}>
        <div style={styles.box} onClick={toggleCategoryVisibility}>
          <h2 style={styles.h2}>Category</h2>
          <img
            src={expandedCategories ? DropUp : DropDown}
            alt="Toggle visibility"
            style={styles.toggleIcon}
          />
        </div>
        {expandedCategories && categories.length > 0 && (
          <ul style={styles.ul}>
            {categories
              .slice(0, showAllCategories ? categories.length : 5)
              .map((category, index) => (
                <li style={styles.li} key={index}>
                  <button
                    onClick={() => toggleSelection(category)}
                    style={{
                      ...styles.button,
                      backgroundColor: activeFilters.includes(category)
                        ? "#E5F1FF"
                        : "transparent",
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            <li style={styles.li}>
              <a href="#" onClick={handleShowAllCategories} style={styles.link}>
                {showAllCategories ? "See less" : "See all"}
              </a>
            </li>
          </ul>
        )}
        {categories.length === 0 && (
          <p style={styles.noData}>No categories available</p>
        )}
      </div>

      <div style={styles.section}>
        <div style={styles.box} onClick={toggleBrandVisibility}>
          <h2 style={styles.h2}>Brands</h2>
          <img
            src={expandedBrands ? DropUp : DropDown}
            alt="Toggle visibility"
            style={styles.toggleIcon}
          />
        </div>
        {expandedBrands && brands.length > 0 && (
          <ul style={styles.ul}>
            {brands
              .slice(0, showAllBrands ? brands.length : 5)
              .map((brand, index) => (
                <li style={styles.li} key={index}>
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
              <a href="#" onClick={handleShowAllBrands} style={styles.link}>
                {showAllBrands ? "See less" : "See all"}
              </a>
            </li>
          </ul>
        )}
        {brands.length === 0 && (
          <p style={styles.noData}>No brands available</p>
        )}
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
    cursor: "pointer",
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
  button: {
    background: "none",
    border: "none",
    color: "#333",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "left",
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  label: {
    marginLeft: "8px",
    color: "#333",
    fontSize: "14px",
  },
  link: {
    color: "#007BFF",
    textDecoration: "none",
  },
  toggleIcon: {
    width: "16px",
    height: "16px",
  },
  noData: {
    padding: "10px",
    color: "#999",
    fontSize: "14px",
  },
};

export default Sidebar;
