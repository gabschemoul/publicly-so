import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
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

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import ProductNav from "@/Components/ProductNav/ProductNav";
import MadeWithPublicly from "@/Components/MadeWithPublicly/MadeWithPublicly";
import { db } from "@/firebase/config";

import closeButton from "../../../../public/Icons/close-white.svg";

import styles from "../../../styles/bugs.module.css";

export default function bugs({ product }) {
  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    attachments: [],
    author: "",
    status: "Reported",
    active: true,
    productId: product.id,
  });
  const [newAttachment, setNewAttachment] = useState({});
  const [newAttachmentsList, setNewAttachmentsList] = useState([]);

  const closeRefs = useRef([]);

  const storage = getStorage();

  const router = useRouter();

  const handleChange = (e) => {
    setNewBug((prev) => {
      const key = e.target.name;
      const value = e.target.value;
      return { ...prev, [key]: value };
    });
  };

  const uploadRef = useRef();
  const attachmentsRef = useRef();

  const handleClickAttachment = (e) => {
    uploadRef.current.click();
  };

  const submitUpload = (e) => {
    setNewAttachment(e.target.files[0]);
  };

  useEffect(() => {
    handleUpload();
  }, [newAttachment]);

  const handleUpload = () => {
    if (newAttachment.name !== undefined) {
      const storageRef = ref(storage, `/files/${newAttachment.name}`);
      const uploadTask = uploadBytesResumable(storageRef, newAttachment);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            /*setNewBug((prev) => {
              const newArray = [...prev.attachments, downloadURL];
              return { ...prev, attachments: newArray };
            });*/
            setNewAttachmentsList((prev) => [...prev, downloadURL]);
          });
        }
      );
    }
  };

  const deleteAttachment = (a) => {
    const newArray = newAttachmentsList.filter((v, i) => i !== a);

    setNewAttachmentsList(newArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productInstance = doc(db, "products", product.id);
    const bugsInstance = collection(db, "bugs");

    const fullBug = {
      ...newBug,
      attachments: newAttachmentsList,
      creationDate: Timestamp.fromDate(new Date()),
    };

    const bugRef = await addDoc(bugsInstance, fullBug);

    const productSnap = await getDoc(productInstance);
    const productData = productSnap.data();
    const productBugs = productData.bugs;
    const newProductBugs = [...productBugs, bugRef.id];

    const newProduct = {
      ...productData,
      bugs: newProductBugs,
    };

    await setDoc(productInstance, newProduct);

    router.push(`/products/${product.slug}/bugs`);
  };

  return (
    <div className={styles.mainWrapper}>
      <ProductNav product={product} />
      <div className={styles.container}>
        <h1 className={styles.productH1}>Report a bug</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            id="author"
            name="author"
            type="email"
            className={styles.author}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <input
            id="title"
            name="title"
            type="text"
            className={styles.title}
            placeholder="Give a title to your bug report"
            onChange={handleChange}
          />
          <textarea
            id="description"
            name="description"
            placeholder="Describe the bug..."
            className={styles.description}
            onChange={handleChange}
          />
          <div className={styles.attachmentsWrapper}>
            <label for="icon" className={styles.label}>
              Attachments
            </label>
            <div className={styles.attachmentsList} ref={attachmentsRef}>
              {newAttachmentsList.map((a, i) => {
                return (
                  <div className={styles.attachmentWrapper}>
                    <div
                      className={styles.attachment}
                      style={{ backgroundImage: "url(" + a + ")" }}
                    ></div>
                    <div className={styles.closeButtonWrapper}>
                      <Image
                        src={closeButton}
                        width={10}
                        height={10}
                        alt=""
                        className={styles.closeButton}
                        ref={(ref) => {
                          closeRefs.current[i] = ref;
                        }}
                        onClick={() => deleteAttachment(i)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <input
              type="file"
              name="attachment"
              id="attachment"
              onChange={submitUpload}
              style={{ display: "none" }}
              ref={uploadRef}
            />
            <div
              className={styles.addAttachment}
              onClick={() => handleClickAttachment()}
            >
              <p>Add attachment</p>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Send bug
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
