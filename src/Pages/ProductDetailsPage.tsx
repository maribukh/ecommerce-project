import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DoneVector from "../assets/images/icons/doneVector.svg";
import message2 from "../assets/images/icons/message2.svg";
import basketIcon from "../assets/images/icons/shopping_basket.svg";
import starColored from "../assets/images/icons/star_colored.svg";
import starNoColor from "../assets/images/icons/star_uncolored.svg";
import profile from "../assets/images/profile/profilephoto.svg";
import germany from "../assets/images/icons/DE.svg";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.productDetailsContainer}>
      <div style={styles.leftSide}>
        <img
          src={product.image}
          alt={product.title}
          style={styles.productImage}
        />
      </div>
      <div style={styles.middleSide}>
        <div style={styles.stock}>
          <img src={DoneVector} alt="instock" />
          <span>In Stock</span>
        </div>
        <div style={styles.aboutProduct}>
          <h1 style={styles.h1}>{product.title}</h1>
          <div style={styles.starsReviewsSoldContainer}>
            <div style={styles.starsContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  key={index}
                  src={
                    index < Math.floor(product.rating)
                      ? starColored
                      : starNoColor
                  }
                  alt="rating"
                  style={styles.starIcon}
                />
              ))}
              <span style={styles.ratingText}>{product.rating.toFixed(1)}</span>
            </div>
            <div style={styles.reviewsSoldContainer}>
              <div style={styles.reviewsContainer}>
                <img src={message2} alt="reviews" style={styles.icon} />
                <span>32 reviews</span>
              </div>
              <div style={styles.soldContainer}>
                <img src={basketIcon} alt="sold" style={styles.icon} />
                <span>154 sold</span>
              </div>
            </div>
          </div>
          <div style={styles.priceContainer}>
            <div style={styles.box}>
              <h1 style={styles.price}>${product.price.toFixed(2)}</h1>
              <p style={styles.p}>50-100 pcs</p>
            </div>
            <div style={styles.middlebox}>
              <h1 style={styles.price}>${product.price.toFixed(2)}</h1>
              <p style={styles.p}>50-100 pcs</p>
            </div>
            <div style={styles.box}>
              <h1 style={styles.price}>${product.price.toFixed(2)}</h1>
              <p style={styles.p}>50-100 pcs</p>
            </div>
          </div>
        </div>
        <div style={styles.shortInfo}>
          <div style={styles.infoBox}>
            <div style={styles.leftTitle}>
              <p>Price:</p>
              <div style={styles.line}></div>

              <p>Type:</p>
              <p>Material:</p>
              <p>Design:</p>
              <div style={styles.line}></div>
              <p>Customization:</p>
              <p>Protection:</p>
              <p>Warranty:</p>
              <div style={styles.line}></div>
            </div>
            <div style={styles.rightDesctiption}>
              <p>Negotiable</p>
              <div style={styles.line}></div>

              <p>Classic shoes</p>
              <p>Plastick Material</p>
              <p>Modern nice</p>
              <div style={styles.line}></div>

              <p>Customized logo and design custom packages</p>
              <p>Refund Policy</p>
              <p>2 years full warranty</p>
              <div style={styles.line}></div>
            </div>
          </div>
        </div>
      </div>
      <div style={styles.rightSide}>
        <div style={styles.profileCard}>
          <div style={styles.topCard}>
            <img src={profile} alt="" />
            <h2>
              Supplier <br />
              Guanjoi Trading LLC
            </h2>
          </div>
          <div style={styles.line}></div>
          <div style={styles.bottomCard}>
            <ul style={styles.ul}>
              <li style={styles.li}>
                <img src={germany} alt="flag" />
                <p>Germany, Berlin</p>
              </li>
              <li style={styles.li}>
                <img src={germany} alt="flag" />
                <p>Germany, Berlin</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  productDetailsContainer: {
    display: "flex",
    margin: "0 auto",
    maxWidth: "1200px",
    // border: "1px solid black",
    padding: "20px",
    paddingLeft: "122px",
  },
  leftSide: {
    width: "28%",
    padding: "20px",
    border: "1px solid #DEE2E7",
    borderRadius: "6px",
  },
  middleSide: {
    padding: "0px 25px",
  },
  productImage: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: "10px",
  },
  stock: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
    color: "#00B517",
    fontWeight: "400",
    gap: "6px",
  },
  aboutProduct: {
    marginTop: "20px",
  },
  starsReviewsSoldContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  starsContainer: {
    display: "flex",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: "10px",
    fontSize: "16px",
    color: "#888",
  },
  reviewsSoldContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  reviewsContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    color: "#888",
  },
  soldContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
    color: "#888",
  },
  icon: {
    marginRight: "5px",
    width: "24px",
    height: "24px",
  },
  starIcon: {
    width: "18px",
    height: "18px",
    marginRight: "3px",
  },
  priceContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF0DF",
    marginTop: "10px",
    marginBottom: "20px",
  },
  box: {
    padding: "15px",
    textAlign: "center",
  },

  middlebox: {
    borderLeft: "1 solid #BDC1C8",
    borderRight: "1 solid #BDC1C8",
    textAlign: "center",

    padding: "15px 15px ",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#FA3434",
    margin: "0",
    padding: "0",
  },

  shortInfo: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  infoBox: {
    display: "flex",
    justifyContent: "space-between",
  },

  leftTitle: {
    color: "#8B96A5",
  },

  rightDesctiption: {
    marginLeft: "30px",
    color: "#505050",
  },

  line: {
    width: "100%",
    borderBottom: "1px solid #E0E0E0",
  },

  rightSide: {},
  topCard: {},
  profileCard: {},

  h1: {
    color: "#1C1C1C",
    fontSize: "20px",
  },
  p: {
    fontSize: "14px",
    color: "#888",
    margin: "0",
    padding: "0",
  },
};

export default ProductDetailsPage;

//  <h1>{product.title}</h1>
//       <img
//         src={product.image}
//         alt={product.title}
//         style={styles.productImage}
//       />
//       <p>{product.description}</p>
//       <p>
//         <strong>Price: </strong>${product.price}
//       </p>
//       <p>
//         <strong>Rating: </strong>
//         {product.rating} stars
//       </p>
//       <button style={styles.addToCartButton}>Add to Cart</button>
