import React, { useState, useEffect } from "react";
import btnIcons from "../assets/images/icons/btn-group.svg";
import clear from "../assets/images/icons/clear.svg";
import starColored from "../assets/images/icons/star_colored.svg";
import starNoColor from "../assets/images/icons/star_uncolored.svg";
import favIcon from "../assets/images/icons/favorite_border.svg";
import leftVector from "../assets/images/icons/chevron-left.svg";
import rightVector from "../assets/images/icons/chevron-right.svg";
import { useNavigate } from "react-router-dom";

const ProductsCard = () => {
  const [filters, setFilters] = useState([
    "Knoll",
    "Essence",
    "Gucci",
    "Dior",
    "4 star",
    "3 star",
  ]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalProducts, setTotalProducts] = useState(0); // Total number of products
  const [loading, setLoading] = useState(false); // Loading state

  const productsPerPage = 10; // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
            (currentPage - 1) * productsPerPage
          }`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total); // Set total products
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]); // Re-fetch when the page changes

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleRemoveFilter = (filterToRemove) => {
    setActiveFilters(
      activeFilters.filter((filter) => filter !== filterToRemove)
    );
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      handleRemoveFilter(filter);
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply brand and rating filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((product) => {
        const brandFilters = activeFilters.filter((f) => !f.includes("star"));
        const ratingFilters = activeFilters.filter((f) => f.includes("star"));

        const matchesBrand =
          brandFilters.length === 0 || brandFilters.includes(product.brand);

        const matchesRating =
          ratingFilters.length === 0 ||
          ratingFilters.some((filter) => {
            const requiredStars = parseInt(filter.split(" ")[0]);
            return product.rating >= requiredStars;
          });

        return matchesBrand && matchesRating;
      });
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const ProductCard: React.FC<{ id: number; name: string }> = ({
    id,
    name,
  }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/product/${id}`);
    };

    return (
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <h3>{name}</h3>
      </div>
    );
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage); // Calculate total pages

  return (
    <div style={styles.productCardContainer}>
      <div style={styles.contentTop}>
        <ul style={styles.ulFilter}>
          <li style={styles.li}>
            <div style={styles.leftTop}>
              <p>
                {filteredProducts.length} Items in <b>Beauty</b>
              </p>
            </div>
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
            <li key={filter} style={styles.li}>
              <div style={styles.filterItem}>
                <button
                  style={{
                    ...styles.button,
                    backgroundColor: activeFilters.includes(filter)
                      ? "#E5F1FF"
                      : "#FFFFFF",
                  }}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                  {activeFilters.includes(filter) && (
                    <img
                      src={clear}
                      alt="clear"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFilter(filter);
                      }}
                    />
                  )}
                </button>
              </div>
            </li>
          ))}
          {activeFilters.length > 0 && (
            <button style={styles.clearAll} onClick={clearAllFilters}>
              Clear all filters
            </button>
          )}
        </ul>
      </div>

      {/* Product cards */}
      <div style={styles.cardsContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.map((product) => (
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
                      src={
                        index < Math.floor(product.rating)
                          ? starColored
                          : starNoColor
                      }
                      alt="rating"
                    />
                  ))}
                </div>
                <p style={styles.description}>{product.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <ul style={styles.ulPage}>
          <li style={styles.li}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <img src={leftVector} alt="left" />
            </button>
          </li>
          <li style={styles.li}>{currentPage}</li>
          <li style={styles.li}>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <img src={rightVector} alt="right" />
            </button>
          </li>
        </ul>
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
    padding: "4px 0px",
    borderRadius: "6px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E0E0E0",
  },
  rightTop: {
    display: "flex",
    justifyContent: "space-between",
    marginRight: "20px",
    gap: "16px",
  },
  leftTop: {
    marginLeft: "20px",
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
    width: "80%",
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
    gap: "0px",
  },
  ulPage: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
  },

  ulFilter: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0",
    padding: "0",
  },
  liPage: {
    width: "16px",
    height: "16px",
    display: "flex",
    justifyContent: "center",

    alignItems: "center",
    border: "1px solid #DEE2E7",
    padding: "10px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },

  liPageHover: {
    backgorundColor: "#DEE2E7",
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
  page: {
    width: "100px",
    borderRadius: "6px",
    fontSize: "1rem",
    padding: "10px 0px",
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

  pagination: {
    display: "flex",
    justifyContent: "flex-end",
  },

  pageContinaer: {
    display: "flex",
    alignItems: "center",

    border: "1px solid #DEE2E7",
  },
};

export default ProductsCard;
