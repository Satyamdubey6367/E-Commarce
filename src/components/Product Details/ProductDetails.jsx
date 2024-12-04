import axios from "axios";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
export default function ProductDetails() {
  const [product, setProduct] = React.useState(1);
  const { id } = useParams();

  console.log("Product dretails id", id);
  const [mainImage, setMainImage] = React.useState("");
  const { user, getUserData } = useContext(CartContext);
  console.log("product details user", user);
  const { isAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("");
  const toast = useToast();

  const getSingleProduct = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/${id}`
      );
      console.log("product details result id", result.data);
      setProduct(result.data);
      setMainImage(result.data.image);
    } catch (error) {}
    setLoading(false);
  };
  const AddToCart = async () => {
    if (isAuth) {
      user?.cart?.push({
        ...product,
        quantity: 1,
        size,
      });

      try {
        await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/carts/?userId=${user.Id}`,
          { cart: user.cart }
        );

        toast({
          title: "Item added to cart",

          status: "success",
          duration: 4000,
          isClosable: true,
        });
        getUserData(user.id);
      } catch (error) {
        console.log("product details error", error);
        toast({
          title: "can not add item to cart",

          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Please Login first",

        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  

  React.useEffect(() => {
    getSingleProduct();
  }, []);

  return (
    product && (
      <div>
        {loading ? (
          <div className={styles.loader}>
            <img src="./logo_Ecommarce.avif" alt="loader" />
          </div>
        ) : (
          <div className={styles.mainBox}>
            <div className={styles.imageBox}>
              <img src={mainImage} alt="clothes" />
            </div>
            <div className={styles.detailsBox}>
              <p className={styles.title}>{product.title}</p>
              <p>
                <span className={styles.price}>₹{product.price}</span>
              </p>
              <p className={styles.taxes}>inclusive of all taxes</p>
              <p className={styles.size}>Select Size</p>
              <div className={styles.sizeBox}>
                <div
                  style={{ border: size === "S" ? "2px solid red" : "" }}
                  onClick={(e) => setSize(e.target.innerText)}
                >
                  S
                </div>
                <div
                  style={{ border: size === "M" ? "2px solid red" : "" }}
                  onClick={(e) => setSize(e.target.innerText)}
                >
                  M
                </div>
                <div
                  style={{ border: size === "L" ? "2px solid red" : "" }}
                  onClick={(e) => setSize(e.target.innerText)}
                >
                  L
                </div>
                <div
                  style={{ border: size === "XL" ? "2px solid red" : "" }}
                  onClick={(e) => setSize(e.target.innerText)}
                >
                  XL
                </div>
                <div
                  style={{ border: size === "2XL" ? "2px solid red" : "" }}
                  onClick={(e) => setSize(e.target.innerText)}
                >
                  2XL
                </div>
              </div>
              <div className={styles.bagBox}>
                <button
                  style={{ cursor: size === "" ? "not-allowed" : "pointer" }}
                  className={styles.bag}
                  onClick={() => AddToCart()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          <div className={styles.loader}>
            <img src="./logo_Ecommarce.avif" alt="loader" />
          </div>
        ) : (
          <div className={styles.mainBoxMobile}>
            <div className={styles.imageBox}>
              <img src={mainImage} alt="clothes" />
            </div>
            <div className={styles.detailsBox}>
              <p className={styles.title}>{product.title}</p>
              <p>
                <span className={styles.price}>₹{product.price}</span>
              </p>
              <p className={styles.taxes}>inclusive of all taxes</p>
              <p className={styles.size}>Select Size</p>
              <div className={styles.sizeBox}>
                <div
                  style={{ border: size === "S" ? "2px solid red" : "" }}
                  onClick={(e) => setSize(e.target.innerText)}
                >
                  S
                </div>
                <div onClick={(e) => setSize(e.target.innerText)}>M</div>
                <div onClick={(e) => setSize(e.target.innerText)}>L</div>
                <div onClick={(e) => setSize(e.target.innerText)}>XL</div>
                <div onClick={(e) => setSize(e.target.innerText)}>2XL</div>
              </div>
              <div className={styles.bagBox}>
                <button className={styles.bag} onClick={() => AddToCart()}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
