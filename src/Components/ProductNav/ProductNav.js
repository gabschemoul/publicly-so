import React from "react";
import Link from "next/link";
import Image from "next/image";

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
              href={`/products/${product.slug}/feedback`}
              className={styles.menuLink}
            >
              Give a feedback
            </Link>
            <Link
              href={`/products/${product.slug}/bugs`}
              className={styles.menuLink}
            >
              Report a bug
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
