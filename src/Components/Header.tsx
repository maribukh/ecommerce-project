// src/components/Header.tsx
import React from "react";
import headerLogo from "../../src/assets/images/logo/Layout/Brand/logo-colored.svg";

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img
          src={headerLogo}
          alt="Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </div>
      <div style={styles.search}>
        <input type="text" placeholder="Search" style={styles.input} />
        <button style={styles.button}>Search</button>
      </div>
      <div style={styles.profile}>
        <span>Profile</span>
        <span>My Cart</span>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 132px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },

  search: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "5px 10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  button: {
    padding: "5px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  profile: {
    display: "flex",
    gap: "15px",
    fontSize: "1rem",
  },
};

export default Header;
