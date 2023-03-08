import React, { useState } from "react";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";

import ProductNav from "@/Components/ProductNav/ProductNav";
import MadeWithPublicly from "@/Components/MadeWithPublicly/MadeWithPublicly";
import { db } from "@/firebase/config";

import styles from "../../../styles/feedback.module.css";

export default function feedback({ product }) {
  const [newFeedback, setNewFeedback] = useState({
    description: "",
    author: "",
    active: true,
    productId: product.id,
  });

  const router = useRouter();

  const handleChange = (e) => {
    setNewFeedback((prev) => {
      const key = e.target.name;
      const value = e.target.value;
      return { ...prev, [key]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productInstance = doc(db, "products", product.id);
    const feedbackInstance = collection(db, "feedbacks");

    const fullFeedback = {
      ...newFeedback,
      creationDate: Timestamp.fromDate(new Date()),
    };

    const feedbackRef = await addDoc(feedbackInstance, fullFeedback);

    const productSnap = await getDoc(productInstance);
    const productData = productSnap.data();
    const productFeedback = productData.feedbacks;
    const newProductFeedback = [...productFeedback, feedbackRef.id];

    const newProduct = {
      ...productData,
      feedbacks: newProductFeedback,
    };

    await setDoc(productInstance, newProduct);

    router.push(`/products/${product.slug}/feedback`);
  };

  return (
    <div className={styles.mainWrapper}>
      <ProductNav product={product} />
      <div className={styles.container}>
        <h1 className={styles.productH1}>Give {product.name} a feedback</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            id="email"
            name="author"
            type="email"
            className={styles.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Share your thought..."
            className={styles.message}
            onChange={handleChange}
          />
          <button type="submit" className={styles.submitButton}>
            Send feedback
          </button>
        </form>
      </div>
      <MadeWithPublicly />
    </div>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;

  const productsInstance = collection(db, "products");

  let product;

  const productRef = query(productsInstance, where("slug", "==", slug));
  const docSnap = await getDocs(productRef);
  docSnap.forEach((snap) => {
    if (snap.exists()) {
      const data = snap.data();
      product = data;
    } else {
      console.log("Not found");
    }
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
