import React, { useState } from "react";
import btnIcons from "../assets/images/icons/btn-group.svg";
import clear from "../assets/images/icons/clear.svg";

const ProductsCard: React.FC = () => {
  const [filters, setFilters] = useState<string[]>([
    "Samsung",
    "Apple",
    "Roco",
    "Metallic",
    "4 star",
    "3 star",
  ]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState("featured");

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter((f) => f !== filter));
  };

  const clearAllFilters = () => {
    setFilters([]);
  };

  return (
    <div style={styles.productCardContinaer}>
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
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </li>
            <li style={styles.li}>
              <img src={btnIcons} alt="Button group icons" />
            </li>
          </div>
        </ul>
      </div>

      {/* filters */}
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

      {/* cards product */}
      <div style={styles.cardsContainer}>
        <div style={styles}></div>

      </div>
    </div>
  );
};

const styles = {
  productCardContinaer: {},
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

  cardsContainer: {},

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
};

export default ProductsCard;
