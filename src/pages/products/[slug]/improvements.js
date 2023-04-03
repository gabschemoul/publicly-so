import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";

import { addUser, addImprovement } from "@/utils/notion";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import ProductNav from "@/Components/ProductNav/ProductNav";
import MadeWithPublicly from "@/Components/MadeWithPublicly/MadeWithPublicly";

import { db, storage } from "@/firebase/config";

import closeButton from "../../../../public/Icons/close-white.svg";

import styles from "../../../styles/improvements.module.css";

export default function improvements({ product }) {
  // STATES

  const [newImprovement, setNewImprovement] = useState({
    title: "",
    description: "",
    notify: false,
    upvotes: 0,
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });

  const [newAttachment, setNewAttachment] = useState({});
  const [newAttachmentsList, setNewAttachmentsList] = useState([]);

  const closeRefs = useRef([]);
  const submitButtonRef = useRef();
  const improvementSentRef = useRef();
  const uploadRef = useRef();
  const attachmentsRef = useRef();

  // HANDLERS

  const handleChange = (e) => {
    setNewImprovement((prev) => {
      const key = e.target.name;
      const value = e.target.value;
      return { ...prev, [key]: value };
    });
  };

  const handleUserChange = (e) => {
    setNewUser((prev) => {
      const key = e.target.name;
      const value = e.target.value;
      return { ...prev, [key]: value };
    });
  };

  const handleNotifyChange = (e) => {
    setNewImprovement((prev) => {
      return { ...prev, notify: e.target.checked };
    });
  };

  // ATTACHMENTS FUNCTIONS

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
            setNewAttachmentsList((prev) => [
              ...prev,
              {
                url: downloadURL,
                name: newAttachment.name,
              },
            ]);
          });
        }
      );
    }
  };

  const deleteAttachment = (a) => {
    const newArray = newAttachmentsList.filter((v, i) => i !== a);

    setNewAttachmentsList(newArray);
  };

  // FORM SUBMISSION

  const handleSubmit = async (e) => {
    e.preventDefault();

    improvementSentRef.current.style.display = "none";
    submitButtonRef.current.innerText = "Sending...";

    const userData = {
      user: {
        properties: {
          Email: {
            email: newUser.email.toLowerCase(),
          },
          Name: {
            title: [
              {
                text: {
                  content: newUser.name,
                },
              },
            ],
          },
        },
      },
      token: product.notion.token,
      database_id: product.notion.databaseId,
    };

    addUser(userData).then((result) => {
      const userId = JSON.parse(result).id;

      const improvementData = {
        properties: {
          Description: {
            rich_text: [
              {
                text: {
                  content: newImprovement.description,
                },
              },
            ],
          },
          Title: {
            title: [
              {
                text: {
                  content: newImprovement.title,
                },
              },
            ],
          },
          Attachments: {
            files: newAttachmentsList.map((a) => {
              return {
                name: a.name,
                type: "external",
                external: {
                  url: a.url,
                },
              };
            }),
          },
          Notify: {
            checkbox: newImprovement.notify,
          },
          Status: {
            select: {
              name: "Requested",
            },
          },
          Upvotes: {
            number: newImprovement.upvotes,
          },
        },
        user: {
          id: userId,
        },
        token: product.notion.token,
        database_id: product.notion.databaseId,
      };

      addImprovement(improvementData);
    });

    e.target.reset();
    setNewAttachmentsList([]);
    submitButtonRef.current.innerText = "Send improvement";
    improvementSentRef.current.style.display = "block";

    //router.push(`/products/${product.slug}/improvements`);
  };

  // PAGE CONTENT

  return (
    <div className={styles.mainWrapper}>
      <ProductNav product={product} />
      <div className={styles.container}>
        <h1 className={styles.productH1}>Suggest an improvement</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            id="title"
            name="title"
            type="text"
            className={styles.title}
            placeholder="Which feature would you improve?"
            onChange={handleChange}
            required
          />
          <textarea
            id="description"
            name="description"
            placeholder="Describe how it would work..."
            className={styles.description}
            onChange={handleChange}
            required
          />
          <div className={styles.attachmentsWrapper}>
            <label htmlFor="icon" className={styles.label}>
              Screenshots (images only for now)
            </label>
            <div className={styles.attachmentsList} ref={attachmentsRef}>
              {newAttachmentsList.map((a, i) => {
                return (
                  <div className={styles.attachmentWrapper}>
                    <div
                      className={styles.attachment}
                      style={{ backgroundImage: "url(" + a.url + ")" }}
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
              accept="image/*"
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
              <p>+ Add</p>
            </div>
          </div>

          <input
            id="email"
            name="email"
            type="email"
            className={styles.author}
            placeholder="Enter your email"
            onChange={handleUserChange}
            required
          />
          <input
            id="name"
            name="name"
            type="text"
            className={styles.author}
            placeholder="Enter your name"
            onChange={handleUserChange}
          />

          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className={styles.checkbox}
              defaultChecked={false}
              onChange={handleNotifyChange}
            />
            <label htmlFor="checkbox" className={styles.checkboxLabel}>
              Notify me when the status of the improvement has changed
            </label>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            ref={submitButtonRef}
          >
            Send improvement
          </button>
          <p className={styles.improvementSent} ref={improvementSentRef}>
            Improvement sent successfully!
          </p>
        </form>
      </div>
      <MadeWithPublicly />
    </div>
  );
}

// SERVER SIDE PROPS

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
