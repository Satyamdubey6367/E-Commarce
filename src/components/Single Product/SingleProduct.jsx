import React from "react";
import styles from "./SingleProduct.module.css";
import { Link } from "react-router-dom";
export default function SingleProduct({ image, category, title, price, id }) {
  return (
    <Link to={`/${id}`}>
      <div className={styles.mainBox}>
        <div className={styles.imageBox}>
          <img src={image} alt="product" />
        </div>
        <h4>{category}</h4>
        <p className={styles.title}>{title}</p>
        <p className={styles.priceSegment}>
          <span className={styles.price}>Rs.{price}</span>
        </p>
        <div></div>
      </div>
    </Link>
  );
}
