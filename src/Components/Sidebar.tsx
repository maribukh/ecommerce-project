import React, { useState } from "react";
import DropDown from "../assets/images/icons//dropDown.svg";

const Sidebar: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

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
          <img src={DropDown} alt="" />
        </div>

        <ul style={styles.ul}>
          <li style={styles.li}>Mobile accessory</li>
          <li style={styles.li}>Electronics</li>
          <li style={styles.li}>Smartphones</li>
          <li style={styles.li}>Modern tech</li>
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
          <img src={DropDown} alt="" />
        </div>

        <ul style={styles.ul}>
          {["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"].map((brand) => (
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

      {/* Features Section */}
      <div style={styles.section}>
        <div style={styles.box}>
          <h2 style={styles.h2}>Features</h2>
          <img src={DropDown} alt="" />
        </div>

        <ul style={styles.ul}>
          {[
            "Metallic",
            "Plastic cover",
            "8GB RAM",
            "Super power",
            "Large Memory",
          ].map((feature) => (
            <li style={styles.li} key={feature}>
              <input
                type="checkbox"
                id={feature}
                checked={selectedFeatures.includes(feature)}
                onChange={() =>
                  toggleSelection(
                    selectedFeatures,
                    setSelectedFeatures,
                    feature
                  )
                }
              />
              <label htmlFor={feature} style={styles.label}>
                {feature}
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
      {/* price range section */}
      <div style={styles.sectionOff}>
        <div style={styles.box}>
          <h2 style={styles.h2}>Price Range</h2>
          <img src={DropDown} alt="" />
        </div>
      </div>
      {/* Condition section */}
      <div style={styles.sectionOff}>
        <div style={styles.box}>
          <h2 style={styles.h2}>Condition</h2>
          <img src={DropDown} alt="" />
        </div>
      </div>
      {/* Ratings section */}
      <div style={styles.sectionOff}>
        <div style={styles.box}>
          <h2 style={styles.h2}>Ratings</h2>
          <img src={DropDown} alt="" />
        </div>
      </div>
      {/* Manufacturer section */}
      <div style={styles.sectionOff}>
        <div style={styles.box}>
          <h2 style={styles.h2}>Manufacturer</h2>
          <img src={DropDown} alt="" />
        </div>
      </div>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "40%",
    paddingLeft: "132px",
    overflowY: "auto" as const,
  },
  section: {
    marginBottom: "20px",
    borderTop: "1px solid #DEE2E7",
  },

  sectionOff: {
    borderTop: "1px solid #DEE2E7",
    cursor: "pointer",
  },

  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  img: {
    display: "flex",
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
