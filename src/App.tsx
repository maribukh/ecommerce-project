import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import ProductsCard from "./Components/ProductCard";
import Footer from "./Components/Footer"; 

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [activeFilters, setActiveFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleAvailableFiltersUpdate = (filters) => {
    setAvailableFilters(filters);
  };

  return (
    <Router>
      <div>
        <Header onSearch={handleSearch} cartCount={cartItems.length} />
        <div style={styles.content}>
          {/* ... categories container and navigation */}
        </div>
        <main style={styles.main}>
          <div style={styles.rightSide}>
            <Sidebar
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onAvailableFiltersUpdate={handleAvailableFiltersUpdate}
            />
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
              {/* ... other routes */}
            </Routes>
          </div>
        </main>
        <Footer /> {/* Добавляем футер */}
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
  content: {
    flex: 1,
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
};

export default App;
