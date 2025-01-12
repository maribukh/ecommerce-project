import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import ProductsCard from "./Components/ProductCard";
import Footer from "./Components/Footer";
import BurgerIcon from "./assets/images/icons/burger.svg";
import DropdownIcon from "./assets/images/icons/dropDown.svg";
import RightVector from "./assets/images/icons/rightVector.svg";
import ProductDetailsPage from "./Pages/ProductDetailsPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<any[]>([]); 
  const [activeFilters, setActiveFilters] = useState<string[]>([]); 
  const [availableFilters, setAvailableFilters] = useState<string[]>([]); 

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (item: any) => {
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
    width: "55%",
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
    paddingLeft: "10px",
    paddingRight: "132px",
  },
  rightSide: {
    flex: 1,
  },
};

export default App;
