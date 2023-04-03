import React from "react";
import Link from "next/link";

import styles from "./ProductNav.module.css";

export default function ProductNav({ product }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.brandWrapper}>
            <div
              className={styles.icon}
              style={{ backgroundImage: "url(" + product.icon + ")" }}
            ></div>

            <p className={styles.productName}>{product.name}</p>
          </div>
          <div className={styles.menuWrapper}>
            <Link
              href={`/products/${product.slug}/bugs`}
              className={styles.menuLink}
            >
              <span>Report a </span>Bug
            </Link>
            <Link
              href={`/products/${product.slug}/improvements`}
              className={styles.menuLink}
            >
              <span>Suggest an </span>Improvement
            </Link>
            <Link
              href={`/products/${product.slug}/features`}
              className={styles.menuLink}
            >
              <span>Suggest a new </span>Feature
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
