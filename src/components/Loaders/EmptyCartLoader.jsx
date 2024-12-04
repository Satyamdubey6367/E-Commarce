import React from "react";
import styles from "./EmptyCartLoader.module.css";
export default function EmptyCartLoader({ location }) {
  return (
    <div className={styles.mainBox}>
      <img
        src="https://img.freepik.com/premium-vector/ecommerce-logo-design_624194-152.jpg?w=2000"
        alt="empty cart"
      />
      <p className={styles.emptyPara}>There is nothing in your {location}</p>
    </div>
  );
}
