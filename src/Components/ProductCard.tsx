import React, { useState, useEffect } from "react";
import btnIcons from "../assets/images/icons/btn-group.svg";
import clear from "../assets/images/icons/clear.svg";
import starColored from "../assets/images/icons/star_colored.svg";
import starNoColor from "../assets/images/icons/star_uncolored.svg";
import favIcon from "../assets/images/icons/favorite_border.svg";

const ProductsCard: React.FC = () => {
  const [filters, setFilters] = useState<string[]>([
    "Knoll",
    "Essence",
    "Gucci",
    "Dior",
    "4 star",
    "3 star",
  ]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [products, setProducts] = useState<any[]>([]);

  // Fetching products from server
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=9")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Sorting function
  const sortProducts = (option: string) => {
    let sortedProducts = [...products];
    switch (option) {
      case "price-low":
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  // Handle sort option change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Check if the product matches any of the selected filters
    const brandMatch = filters.some((filter) =>
      product.brand.toLowerCase().includes(filter.toLowerCase())
    );
    const ratingMatch = filters.some((filter) =>
      filter.includes("star") ? product.rating >= parseInt(filter) : false
    );
    return (brandMatch || ratingMatch) && (!verifiedOnly || product.isVerified);
  });

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  return (
    <div style={styles.productCardContainer}>
      <div style={styles.contentTop}>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <p>
              12,911 Items in <b>Mobile accessory</b>
            </p>
          </li>
          <div style={styles.rightTop}>
            <li style={styles.li}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                />
                <p style={styles.pSpace}>Verified Only</p>
              </div>
            </li>
            <li style={styles.li}>
              <select
                style={styles.select}
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </li>
            <li style={styles.li}>
              <img src={btnIcons} alt="Button group icons" />
            </li>
          </div>
        </ul>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <ul style={styles.ul}>
          {filters.map((filter) => (
            <li style={styles.li} key={filter}>
              <div style={styles.filterItem}>
                <button
                  style={styles.button}
                  onClick={() => handleRemoveFilter(filter)}
                >
                  {filter} <img src={clear} alt="clear" />
                </button>
              </div>
            </li>
          ))}
          {filters.length > 0 && (
            <button style={styles.clearAll} onClick={clearAllFilters}>
              Clear all filters
            </button>
          )}
        </ul>
      </div>

      {/* Product cards */}
      <div style={styles.cardsContainer}>
        {sortProducts(sortOption).map((product) => (
          <div style={styles.cardBox} key={product.id}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", height: "auto" }}
            />
            <div style={styles.cardBottom}>
              <div style={styles.priceContainer}>
                <h1 style={styles.h1}>${product.price.toFixed(2)}</h1>
                <span style={styles.span}>
                  <del>${(product.price * 1.1).toFixed(2)}</del>
                </span>
              </div>

              <div style={styles.favButton}>
                <img src={favIcon} alt="fav" />
              </div>
              <div style={styles.starsContainer}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <img
                    key={index}
                    src={index < product.rating ? starColored : starNoColor}
                    alt="rating"
                  />
                ))}
              </div>
              <p style={styles.description}>{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  productCardContainer: {},
  contentTop: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 20px",
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E0E0E0",
  },
  rightTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
  },
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px",
  },
  cardBox: {
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "30px",
    position: "relative",
  },
  cardBottom: {},
  h1: {
    fontSize: "1.1rem",
    margin: "10px 0",
  },

  priceContainer: {
    display: "flex",
    alignItems: "center",
  },
  span: {
    marginLeft: "10px",
    color: "#999",
    fontSize: "0.9rem",
  },
  favButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
  starsContainer: {
    display: "flex",
    marginBottom: "10px",
  },
  filters: {
    marginTop: "10px",
  },
  filterItem: {
    display: "flex",
    alignItems: "center",
    marginRight: "14px",
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 10px",
    backgroundColor: "#FFFFFF",
    color: "#505050",
    border: "1px solid #0D6EFD",
    borderRadius: "5px",
    fontSize: "1rem",
    gap: "9px",
    cursor: "pointer",
  },
  clearAll: {
    backgroundColor: "none",
    color: "#0D6EFD",
    border: "none",
    cursor: "pointer",
  },
  ul: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    padding: "0",
    margin: "0",
    gap: "10px",
    justifyContent: "space-between",
  },
  li: {
    display: "flex",
    alignItems: "center",
  },
  select: {
    width: "172px",
    borderRadius: "6px",
    fontSize: "1rem",
    padding: "10px",
    outline: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
    border: "1px solid #E0E0E0",
  },
  pSpace: {
    marginLeft: "8px",
    fontSize: "16px",
    color: "#1C1C1C",
  },
  description: {
    marginTop: "10px",
    fontSize: "0.9rem",
    color: "#606060",
  },
};

export default ProductsCard;
