import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside style={styles.sidebar}>
      {/* Category Section */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Category</h2>
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
        <h2 style={styles.h2}>Brands</h2>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <input type="checkbox" id="samsung" />
            <label htmlFor="samsung" style={styles.label}>
              Samsung
            </label>
          </li>
          <li style={styles.li}>
            <input type="checkbox" id="apple" />
            <label htmlFor="apple" style={styles.label}>
              Apple
            </label>
          </li>
          <li style={styles.li}>
            <input type="checkbox" id="huawei" />
            <label htmlFor="huawei" style={styles.label}>
              Huawei
            </label>
          </li>
          <li style={styles.li}>
            <input type="checkbox" id="pocco" />
            <label htmlFor="pocco" style={styles.label}>
              Pocco
            </label>
          </li>
          <li style={styles.li}>
            <input type="checkbox" id="lenovo" />
            <label htmlFor="lenovo" style={styles.label}>
              Lenovo
            </label>
          </li>
          <li style={styles.li}>
            <a href="#" style={styles.link}>
              See all
            </a>
          </li>
        </ul>
      </div>

      {/* Features Section */}
      <div style={styles.section}>
        <h2 style={styles.h2}>Features</h2>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <input type="checkbox" id="metallic" />
            <label htmlFor="metallic" style={styles.label}>
              Metallic
            </label>
          </li>
          <li style={styles.li}>
            <input type="checkbox" id="plastic-cover" />
            <label htmlFor="plastic-cover" style={styles.label}>
              Plastic cover
            </label>
          </li>
          <li style={styles.li}>
            <input type="checkbox" id="8gb-ram" />
            <label htmlFor="8gb-ram" style={styles.label}>
              8GB Ram
            </label>
          </li>
          <li style={styles.li}>
            <input type="checkbox" id="super-power" />
            <label htmlFor="super-power" style={styles.label}>
              Super power
            </label>
          </li>
          <li style={styles.li}>
            <input type="checkbox" id="large-memory" />
            <label htmlFor="large-memory" style={styles.label}>
              Large Memory
            </label>
          </li>
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
    width: "15%",
    padding: "20px 132px",
    overflowY: "auto" as const,
  },
  section: {
    marginBottom: "20px",
  },
  h2: {
    fontSize: "16px",
    color: "#333",
    margin: "0",
    padding: "15px 0px",
    borderTop: "1px solid #DEE2E7",
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
