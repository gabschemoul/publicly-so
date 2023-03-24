import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";

import { Client } from "@notionhq/client";

import { addUser, addBug } from "@/utils/notion";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import ProductNav from "@/Components/ProductNav/ProductNav";
import MadeWithPublicly from "@/Components/MadeWithPublicly/MadeWithPublicly";

import { db, storage } from "@/firebase/config";

import closeButton from "../../../../public/Icons/close-white.svg";

import styles from "../../../styles/bugs.module.css";

export default function bugs({ product }) {
  // STATES

  const [newBug, setNewBug] = useState({
    title: "",
    description: "",
    notify: false,
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
  });

  const [newAttachment, setNewAttachment] = useState({});
  const [newAttachmentsList, setNewAttachmentsList] = useState([]);

  const closeRefs = useRef([]);
  const submitButtonRef = useRef();
  const bugSentRef = useRef();
  const uploadRef = useRef();
  const attachmentsRef = useRef();

  // HANDLERS

  const handleChange = (e) => {
    setNewBug((prev) => {
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
    setNewBug((prev) => {
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

    bugSentRef.current.style.display = "none";
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
      console.log("User id: " + userId);

      const bugData = {
        properties: {
          Description: {
            rich_text: [
              {
                text: {
                  content: newBug.description,
                },
              },
            ],
          },
          Title: {
            title: [
              {
                text: {
                  content: newBug.title,
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
            checkbox: newBug.notify,
          },
          Status: {
            select: {
              name: "Reported",
            },
          },
        },
        user: {
          id: userId,
        },
        token: product.notion.token,
        database_id: product.notion.databaseId,
      };

      console.log("bugData");
      console.log(bugData);

      addBug(bugData);
    });

    e.target.reset();
    setNewAttachmentsList([]);
    submitButtonRef.current.innerText = "Send bug";
    bugSentRef.current.style.display = "block";

    //router.push(`/products/${product.slug}/bugs`);
  };

  // PAGE CONTENT

  return (
    <div className={styles.mainWrapper}>
      <ProductNav product={product} />
      <div className={styles.container}>
        <h1 className={styles.productH1}>Report a bug</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <input
            id="title"
            name="title"
            type="text"
            className={styles.title}
            placeholder="Give a title to your bug report"
            onChange={handleChange}
            required
          />
          <textarea
            id="description"
            name="description"
            placeholder="Describe the bug..."
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
              Notify me when the bug has been resolved
            </label>
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            ref={submitButtonRef}
          >
            Send bug
          </button>
          <p className={styles.bugSent} ref={bugSentRef}>
            Bug sent successfully!
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
