import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import ProductsCard from "./Components/ProductCard";
import Footer from "./Components/Footer";
import BurgerIcon from "./assets/images/icons/burger.svg";
import DropdownIcon from "./assets/images/icons/dropDown.svg";
import RightVector from "./assets/images/icons/rightVector.svg";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import DE from "../src/assets/images/icons/DE.svg";

// Type definitions
type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  thumbnail: string;
};

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [availableFilters, setAvailableFilters] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (item: Product) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  const handleAvailableFiltersUpdate = (filters: string[]) => {
    setAvailableFilters(filters);
  };

  return (
    <Router>
      <div>
        <Header onSearch={handleSearch} cartCount={cartItems.length} />

        <div style={styles.categoriesContainer}>
          <div style={styles.leftSide}>
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
          <div style={styles.rightBox}>
            <div style={styles.langContainer}>
              <ul style={styles.ulLang}>
                <li style={styles.liLang}>English</li>
                <li style={styles.liLang}>
                  USD <img src={DropdownIcon} alt="" />
                </li>
              </ul>
              <ul style={styles.ulLang}>
                <li style={styles.liLang}>Ship to</li>
                <li style={styles.liLang}>
                  <img src={DE} alt="" />
                  <img src={DropdownIcon} alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <nav>
          <div style={styles.navContainer}>
            <ul style={styles.ulNav}>
              <li style={styles.li}>
                {/* Link component for Home */}
                <Link to="/" style={styles.link}>
                  <p style={styles.pSpacing}>Home</p>
                </Link>
                <img src={RightVector} alt="right" />
              </li>
              <li style={styles.li}>
                <p style={styles.pSpacing}>Clothings</p>
                <img src={RightVector} alt="right" />
              </li>
              <li style={styles.li}>
                <p style={styles.pSpacing}>Men's wear</p>
                <img src={RightVector} alt="right" />
              </li>
              <li style={styles.li}>
                <p style={styles.pSpacing}>Summer clothing</p>
              </li>
            </ul>
          </div>
        </nav>

        <main style={styles.main}>
          <div style={styles.rightSide}>
            <Routes>
              <Route
                path="/"
                element={
                  <Sidebar
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onAvailableFiltersUpdate={handleAvailableFiltersUpdate}
                  />
                }
              />
            </Routes>
          </div>

          <div style={styles.leftSide}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProductsCard
                    searchQuery={searchQuery}
                    onAddToCart={handleAddToCart}
                    activeFilters={activeFilters}
                    availableFilters={availableFilters}
                    onFilterChange={handleFilterChange}
                  />
                }
              />

              <Route path="/product/:id" element={<ProductDetailsPage />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

const styles = {
  body: {
    backgroundColor: "#DEE2E7",
    fontFamily: "Arial, sans-serif",
  },
  main: {
    display: "flex",
  },
  categoriesContainer: {
    display: "flex",
    alignItems: "center",
    padding: "8px 132px",
    border: "1px solid #E0E0E0",
    backgroundColor: "#FFFFFF",
  },
  ul: {
    width: "85%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0",
    listStyle: "none",
    margin: "0",
  },

  li: {
    display: "flex",
    alignItems: "center",
  },
  navContainer: {
    padding: "0px 132px",
    color: "#8B96A5",
    cursor: "pointer",
  },
  pSpacing0: {
    marginLeft: "10px",
  },
  pSpacing: {
    marginRight: "10px",
  },
  leftSide: {
    width: "100%",
    paddingRight: "132px",
  },

  rightSide: {
    flex: 1,
  },

  rightBox: {
    width: "40%",
    display: "flex",
  },

  langContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },

  ulLang: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0",
    listStyle: "none",
    margin: "0",
  },

  liLang: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  },

  ulNav: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0",
    listStyle: "none",
    margin: "0",
  },

  link: {
    textDecoration: "none", 
    color: "inherit", 
  },
};

export default App;
