import React from "react";
import headerLogo from "../assets/images/logo/Layout/Brand//logo-colored.svg";
import ProfileIcon from "../assets/images/icons/profile.svg"; 
import MessageIcon from "../assets/images/icons/message.svg";
import OrderIcon from "../assets/images/icons/fav.svg";
import CartIcon from "../assets/images/icons/cart.svg";

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div>
        <img
          src={headerLogo}
          alt="Logo"
          style={{ width: "150px", height: "auto" }}
        />
      </div>
      <div style={styles.search}>
        <input type="text" placeholder="Search" style={styles.input} />
        <select style={styles.select} name="all categories">
          <option value="">All Categories</option>
        </select>
        <button style={styles.button}>Search</button>
      </div>
      <div style={styles.actions}>
        <ul style={styles.ul}>
          <li style={styles.li}>
            <img src={ProfileIcon} alt="Profile" style={styles.icon} />
            <p style={styles.p}>Profile</p>
          </li>
          <li style={styles.li}>
            <img src={MessageIcon} alt="Message" style={styles.icon} />
            <p style={styles.p}>Message</p>
          </li>
          <li style={styles.li}>
            <img src={OrderIcon} alt="Order" style={styles.icon} />
            <p style={styles.p}>Order</p>
          </li>
          <li style={styles.li}>
            <img src={CartIcon} alt="Cart" style={styles.icon} />
            <p style={styles.p}>My Cart</p>
          </li>
        </ul>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 132px",
    backgroundColor: "#FFFFFF",
  },
  search: {
    width: "57%",
    display: "flex",
    alignItems: "center",
    border: "3px solid #0D6EFD",
    borderRadius: "4px",
  },
  input: {
    width: "75%",
    padding: "10px 10px",
    fontSize: "1rem",
    border: "none",
    outline: "none",
  },
  select: {
    fontSize: "1rem",
    padding: "11px 10px",
    borderRadius: "0",
    outline: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
    border: "1px solid #0D6EFD",
  },
  button: {
    width: "23%",
    padding: "12px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    fontSize: "1rem",
    color: "#8B96A5",
  },
  ul: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  li: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginBottom: "5px",
  },
  p: {
    margin: 0,
    fontSize: "0.9rem",
  },
};

export default Header;
