import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DoneVector from "../assets/images/icons/doneVector.svg";
import message2 from "../assets/images/icons/message2.svg";
import basketIcon from "../assets/images/icons/shopping_basket.svg";
import starColored from "../assets/images/icons/star_colored.svg";
import starNoColor from "../assets/images/icons/star_uncolored.svg";
import profile from "../assets/images/profile/profilephoto.svg";
import germany from "../assets/images/icons/DE.svg";
import verify from "../assets/images/icons/verified.svg";
import worldwide from "../assets/images/icons/worldwide.svg";
import favIcon from "../assets/images/icons/heart.svg";
import item from "../assets/images/items/1.svg";
import item2 from "../assets/images/items/2.svg";
import item3 from "../assets/images/items/3.svg";
import item4 from "../assets/images/items/4.svg";
import item5 from "../assets/images/items/5.svg";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        console.log("Product Data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch related products");
        }
        const data = await response.json();
        const related = data.products.filter(
          (item: any) =>
            item.category === product?.category && item.id !== product?.id
        );
        setRelatedProducts(related.slice(0, 6));
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const handleRelatedProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const discountedPrice = product.discountPercentage
    ? (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2)
    : null;

  return (
    <div style={styles.container}>
      <div style={styles.productDetailsContainer}>
        {/* Left Side */}
        <div style={{ ...styles.leftSide, width: "40%" }}>
          <img
            src={product.images?.[0] || "fallback-image-url.jpg"}
            alt={product.title}
            style={{ ...styles.productImage, width: "100%" }}
            onError={(e) => {
              e.target.src = "fallback-image-url.jpg";
            }}
          />
        </div>

        <div style={styles.middleSide}>
          <div style={styles.stock}>
            <img src={DoneVector} alt="In Stock" />
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
                    alt="Rating"
                    style={styles.starIcon}
                  />
                ))}
                <span style={styles.ratingText}>
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <div style={styles.reviewsSoldContainer}>
                <div style={styles.reviewsContainer}>
                  <img src={message2} alt="Reviews" style={styles.icon} />
                  <span>32 reviews</span>
                </div>
                <div style={styles.soldContainer}>
                  <img src={basketIcon} alt="Sold" style={styles.icon} />
                  <span>154 sold</span>
                </div>
              </div>
            </div>
            <div style={styles.priceContainer}>
              <div style={styles.box}>
                <h1 style={styles.price}>${product.price.toFixed(2)}</h1>
              </div>

              <div style={styles.box}>
                {discountedPrice && (
                  <div style={styles.discountContainer}>
                    <p
                      style={{
                        ...styles.p,
                        textDecoration: "line-through",
                        marginRight: "10px",
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
              <div style={styles.box}>
                <p style={{ ...styles.p, color: "#FA3434" }}>
                  ${discountedPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Short Info */}
          <div style={styles.shortInfo}>
            <div style={styles.infoBox}>
              <div style={styles.leftTitle}>
                <p>Price:</p>
                <p>Category:</p>
                <p>Brand:</p>
                <p>Description:</p>
                <p>Warranty:</p>
              </div>
              <div style={styles.rightDesctiption}>
                <p>{product.price ? `Negotiable` : "Not Negotiable"}</p>
                <p>{product.category || "N/A"}</p>
                <p>{product.brand || "Unknown"}</p>
                <p>{product.description || "No description available"}</p>
                <p>
                  {product.warranty
                    ? `${product.warranty} years`
                    : "No warranty"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div style={styles.rightSide}>
          <div style={styles.profileCard}>
            <div style={styles.topCard}>
              <img src={profile} alt="Profile" />
              <p style={styles.pCard}>
                Supplier <br />
                Guanjoi Trading LLC
              </p>
            </div>
            <div style={styles.line}></div>
            <div style={styles.middleCard}>
              <ul style={styles.ul}>
                <li style={styles.li}>
                  <img src={germany} alt="Germany Flag" />
                  <p style={styles.pMiddle}>Germany, Berlin</p>
                </li>
                <li style={styles.li}>
                  <img src={verify} alt="Verified Seller" />
                  <p style={styles.pMiddle}>Verified Seller</p>
                </li>
                <li style={styles.li}>
                  <img src={worldwide} alt="Worldwide Shipping" />
                  <p style={styles.pMiddle}>Worldwide shipping</p>
                </li>
              </ul>
            </div>
            <div style={styles.bottomCard}>
              <button style={styles.firstButton}>Send inquiry</button>
              <button style={styles.secondButton}>Seller’s profile</button>
            </div>
          </div>

          <div style={styles.save}>
            <img src={favIcon} alt="Favorite" />
            <p style={styles.pSave}>Save for later</p>
          </div>
        </div>
      </div>

      <div style={styles.middleContainer}>
        <div style={styles.menu}>
          <ul style={styles.ulMenu}>
            <li style={styles.liMenuActive}>Description</li>
            <li style={styles.liMenu}>Reviews</li>
            <li style={styles.liMenu}>Shipping</li>
            <li style={styles.liMenu}>About Company</li>
          </ul>
        </div>
        <div style={styles.middleRightSide}>
          <p style={styles.pMenu}>You may like</p>
          <div style={styles.itemsContainer}>
            <div style={styles.itemsBox}>
              <img src={item} alt="" />
              <div style={styles.itemInfo}>
                <p style={styles.pItem}>Apple Watch Series Space Gray</p>
                <p style={styles.p}>$7.00 - $99.50</p>
              </div>
            </div>
            {/* Other item boxes */}
          </div>
        </div>
      </div>

      <div style={styles.blockRecommend}>
        <h1 style={styles.h1}>Related Products</h1>
        <div style={styles.cardsContainer}>
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct: any) => (
              <div
                key={relatedProduct.id}
                style={styles.cardBox}
                onClick={() => handleRelatedProductClick(relatedProduct.id)}
              >
                <img
                  src={relatedProduct.thumbnail}
                  alt={relatedProduct.title}
                  style={styles.productImageRelated}
                />
                <p style={styles.productitle}>{relatedProduct.title}</p>
                <p style={styles.productprice}>
                  ${relatedProduct.price.toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p>No related products available</p>
          )}
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    padding: "0px 0px 20px 122px",
    margin: "auto",
  },
  productDetailsContainer: {
    display: "flex",
    maxWidth: "1100px",
    border: "1px solid #DEE2E7",
    borderRadius: "6px",
    background: "white",
    color: "#FFFFFF",
    padding: "20px 20px 20px 20px",
  },
  leftSide: {
    background: "#FFFFFF",
  },
  middleSide: {
    width: "41%",
    padding: "0px 25px",
  },
  rightSide: {
    width: "25%",
    padding: "0px 15px",
  },
  productImage: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: "6px",
    border: "1px solid #EEEEEE",
    background: "#FFFFFF",
  },

  productImageRelated: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: "6px",
    background: "#EEEEEE",
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
    alignItems: "center",
    backgroundColor: "#FFF0DF",
    marginTop: "10px",
    marginBottom: "20px",
    padding: "8px",
  },
  box: {
    padding: "15px",
    textAlign: "center",
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
  profileCard: {
    background: "white",
    padding: "20px",
    border: "1px solid #DEE2E7",
    borderRadius: "6px",
  },
  topCard: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    marginBottom: "20px",
  },
  pCard: {
    margin: "0",
    padding: "0",
    color: "#1C1C1C",
  },
  bottomCard: {
    display: "flex",
    gap: "8px",
    flexDirection: "column",
    marginTop: "28px",
  },
  firstButton: {
    background: "linear-gradient(180deg, #127FFF 0%, #0067FF 100%)",
    color: "white",
    borderRadius: "6px",
    padding: "11px 0px",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  secondButton: {
    background: "#FFFFFF",
    color: "#0D6EFD",
    borderRadius: "6px",
    padding: "11px 0px",
    border: "1px solid #DEE2E7",
    outline: "none",
    cursor: "pointer",
  },
  save: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    marginTop: "23px",
  },
  pSave: {
    margin: "0",
    padding: "0",
    color: "#0D6EFD",
    fontWeight: "500",
  },
  h1: {
    color: "#1C1C1C",
    fontSize: "20px",
  },
  ulMenu: {
    listStyle: "none",
    margin: "0",
    padding: "0",
    display: "flex",
    justifyContent: "space-between",
  },
  liMenuActive: {
    color: "#0D6EFD",
    padding: "16px 16px 13px 16px",
    fontWeight: "500",
    borderBottom: "2px solid #0D6EFD",
  },
  liMenu: {
    display: "flex",
    padding: "16px 16px 13px 16px",
    color: "#8B96A5",
    cursor: "pointer",
  },
  middleRightSide: {
    width: "23%",
    background: "white",
    padding: "20px 22px 36px 16px",
    borderRadius: "6px",
    border: "1px solid #DEE2E7",
  },

  pMiddle: {
    margin: "0",
    padding: "0",
  },

  ul: {
    listStyle: "none",
    margin: "0",
    padding: "0",
  },

  li: {
    display: "flex",
    gap: "18px",
    color: "#8B96A5",
    margin: "8px 0px",
  },

  middleContainer: {
    display: "flex",
    padding: "20px 0px 85px 0px",
    justifyContent: "space-between",
  },

  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  itemsBox: {
    display: "flex",
    gap: "11px",
  },

  pItem: {
    margin: "0px",
    color: "#1C1C1C",
    fontWeight: "400",
    marginBottom: "3px",
  },

  itemInfo: {},
  productitle: {
    color: "#505050",
  },
  productprice: {
    color: "#8B96A5",
  },
  blockRecommend: {
    height: "350px",
    padding: "20px 26px 0px 22px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #DEE2E7",
    borderRadius: "6px",
  },
  cardsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  cardBox: {
    width: "155px",
    height: "155px",
    cursor: "pointer",
  },

  p: {
    fontSize: "16px",
    color: "#888",
    margin: "0px",
    padding: "0px",
    fontWeight: "400",
  },

  discountContainer: {
    display: "flex",
  },
};

export default ProductDetailsPage;
