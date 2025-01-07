import React from "react";
import btnIcons from "../assets/images/icons/btn-group.svg";

const ProductsCard: React.FC = () => {
  return (
    <div style={styles.contentTop}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <p>
            12,911 Items in <b>Mobile accessory</b>
          </p>
        </li>
        <li style={styles.li}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" />
            <p style={styles.pSpace}>Verified Only</p>
          </div>
        </li>
        <li style={styles.li}>
          <select name="filter" id="filter">
            <option value="featured">Featured</option>
          </select>
        </li>
        <li style={styles.li}>
          <img src={btnIcons} alt="Button group icons" />
        </li>
      </ul>
    </div>
  );
};

const styles = {
  contentTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #E0E0E0",
  },
  ul: {
    display: "flex",
    alignItems: "center",
    listStyle: "none",
    padding: "0",
    margin: "0",
    gap: "16px",
  },
  li: {
    display: "flex",
    alignItems: "center",
  },
  pSpace: {
    marginLeft: "8px",
    fontSize: "14px",
    color: "#8B96A5",
  },
};

export default ProductsCard;
