import React, { useState } from "react";

import ProductNav from "../ProductNav/ProductNav";

import styles from "./ProductContainer.module.css";

export default function ProductContainer({ children }) {
  const [product, setProduct] = useState({
    name: "Inboxs.io",
  });

  return (
    <div className={styles.container}>
      <ProductNav product={product} />
      <main>{children}</main>
    </div>
  );
}
