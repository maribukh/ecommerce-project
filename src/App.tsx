import React from "react";
import Header from "./components/Header";
import BurgerIcon from "./assets/images/icons/burger.svg";
import DropdownIcon from "./assets/images/icons/dropDown.svg";
import RightVector from "./assets/images/icons/rightVector.svg";

function App() {
  return (
    <div>
      <Header />
      <main>
        <div style={styles.categoriesContainer}>
          <ul style={styles.ul}>
            <li style={styles.li}>
              <img src={BurgerIcon} alt="icon" />
              <p style={styles.pSpacing0}>All Category</p>
            </li>
            <li style={styles.li}>Hot offers</li>
            <li style={styles.li}>Gift boxes</li>
            <li style={styles.li}>Projects</li>
            <li style={styles.li}>Menu Items</li>
            <li style={styles.li}>
              Help
              <img src={DropdownIcon} alt="DropDown" />
            </li>
          </ul>
        </div>
        <nav>
          <div style={styles.navContainer}>
            <ul style={styles.ul}>
              <li style={styles.li}>
                <p style={styles.pSpacing}>Home</p>
                <img src={RightVector} alt="right" />
              </li>
              <li style={styles.li}>
                <p style={styles.pSpacing}>Clothings</p>
                <img src={RightVector} alt="right" />
              </li>
              <li style={styles.li}>
                <p style={styles.pSpacing}> Men's wear</p>
                <img src={RightVector} alt="right" />
              </li>
              <li style={styles.li}>
                <p style={styles.pSpacing}> Summer clothing</p>
              </li>
            </ul>
          </div>
        </nav>
      </main>
    </div>
  );
}

export default App;

const styles = {
  body: {
    backgroundColor: "#DEE2E7",
  },

  categoriesContainer: {
    width: "100%",
    display: "flex",
    alignItems: "centre",
    padding: "8px 132px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
  },

  ul: {
    width: "40%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "centre",
    padding: "0",
    listStyle: "none",
    margin: "0",
  },

  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navContainer: {
    padding: "10px 132px",
    color: "#8B96A5",
    cursor: "pointer",
  },

  pSpacing0: {
    marginLeft: "10px",
  },

  pSpacing: {
    marginRight: "10px",
  },
};
