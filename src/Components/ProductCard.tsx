import React, { useState, useEffect } from "react";
import btnIcons from "../assets/images/icons/btn-group.svg";
import clear from "../assets/images/icons/clear.svg";
import starColored from "../assets/images/icons/star_colored.svg";
import starNoColor from "../assets/images/icons/star_uncolored.svg";
import favIcon from "../assets/images/icons/favorite_border.svg";
import leftVector from "../assets/images/icons/chevron-left.svg";
import rightVector from "../assets/images/icons/chevron-right.svg";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const productsPerPage = 9;
  const navigate = useNavigate();
  const location = useLocation();

  // URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sort = urlParams.get("sort");
    if (sort) {
      setSortOption(sort);
    }
  }, [location]);

  // Function to fetch products based on searchQuery and other filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchQuery}&limit=${productsPerPage}&skip=${
            (currentPage - 1) * productsPerPage
          }`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery]); // Fetch products whenever searchQuery or currentPage changes

  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);
    updateUrl(selectedSortOption);
  };

  const updateUrl = (sortOption) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("sort", sortOption);
    navigate(`?${urlParams.toString()}`, { replace: true });
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

  const getFilteredProducts = () => {
    let filtered = [...products];

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

  const ProductCard = ({ id, thumbnail, product }) => {
    const handleClick = () => {
      navigate(`/product/${id}`, { state: { product } });
    };

    return (
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <img
          src={thumbnail}
          alt="Product thumbnail"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </div>
    );
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const visiblePages = () => {
    const maxVisible = 4;
    const pages = [];

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

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
      <div style={styles.searchContainer}>
        <div style={styles.search}>
          <input
            type="search"
            style={styles.input}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
          <button
            type="submit"
            style={styles.buttonSubmit}
            onClick={() => setCurrentPage(1)}
          >
            Search
          </button>
        </div>
      </div>

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
                        setActiveFilters(
                          activeFilters.filter((f) => f !== filter)
                        );
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

      <div style={styles.cardsContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.map((product) => (
            <div style={styles.cardBox} key={product.id}>
              <ProductCard
                id={product.id}
                thumbnail={product.thumbnail}
                product={product}
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
                  <span style={styles.ratingText}>
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <p style={styles.title}>{product.title}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={styles.pagination}>
        <ul style={styles.ulPage}>
          <li style={styles.liPage}>
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === 1 && styles.disabledButton),
              }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <img src={leftVector} alt="Back" style={styles.arrowIcon} />
            </button>
          </li>

          {visiblePages().map((pageNumber) => (
            <li key={pageNumber} style={styles.liPage}>
              <button
                style={{
                  ...styles.paginationButtonNumber,
                  ...(currentPage === pageNumber && styles.activePageButton),
                }}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}

          <li style={styles.liPage}>
            <button
              style={{
                ...styles.paginationButton,
                ...(currentPage === totalPages && styles.disabledButton),
              }}
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <img src={rightVector} alt="Next" style={styles.arrowIcon} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  productCardContainer: {
    padding: "0px 20px 20px 20px",
  },
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
    padding: "0px 30px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    border: "1px solid #E0E0E0",
    borderRadius: "6px",
    position: "absolute",
    top: "220px",
    right: "20px",
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
  ulFilter: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0",
    padding: "0",
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
  pageContinaer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #DEE2E7",
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "20px",
  },
  ulPage: {
    display: "flex",
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  liPage: {
    display: "flex",
  },
  paginationButton: {
    border: "1px solid #E0E0E0",
    borderRadius: "4px",
    padding: "6px 12px",
    backgroundColor: "#FFFFFF",
    color: "#505050",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  paginationButtonNumber: {
    border: "1px solid #E0E0E0",
    padding: "6px 12px",
    backgroundColor: "#FFFFFF",
    color: "#505050",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  activePageButton: {
    border: "1px solid #0D6EFD",
    backgroundColor: "#E9F2FF",
    fontWeight: "bold",
    color: "#0D6EFD",
  },
  disabledButton: {
    color: "#CCCCCC",
    cursor: "not-allowed",
  },
  arrowIcon: {
    width: "20px",
    height: "20px",
  },
  ratingText: {
    marginLeft: "10px",
    fontSize: "1rem",
    color: "#FF9017",
  },
  title: {
    color: "#606060",
  },

  input: {
    width: "100%",
    outline: "none",
    padding: "5px",
    border: "1px solid #E0E0E0",
    borderRadius: "6px 0px 0px 6px",
  },

  searchContainer: {
    margin: "10px 0px",
  },

  search: {
    width: "100%",
    display: "flex",
  },

  buttonSubmit: {
    width: "10%",
    padding: "8px 0px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
    border: "1px solid #0D6EFD",
    borderRadius: "0px 6px 6px 0px",
    outline: "none",
  },
};

export default ProductsCard;
