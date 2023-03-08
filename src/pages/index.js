import React, { useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";

import MainNav from "../Components/MainNav/MainNav";
import MainFooter from "../Components/MainFooter/MainFooter";

import heroScreenshot from "../../public/Screenshots/homeHeroScreenshot.png";
import bugIcon from "../../public/Icons/bugIcon.svg";
import messageIcon from "../../public/Icons/messageIcon.svg";
import lightbulbIcon from "../../public/Icons/lightbulbIcon.svg";
import likeIcon from "../../public/Icons/likeIcon.svg";
import planeIcon from "../../public/Icons/planeIcon.svg";
import calendarIcon from "../../public/Icons/calendarIcon.svg";
import closeButton from "../../public/Icons/close-white.svg";
import doneIcon from "../../public/Icons/doneIcon.svg";

import { collection, addDoc } from "firebase/firestore";

import { dbLeads, db } from "@/firebase/config";

export default function Home() {
  const [newSignup, setNewSignup] = useState({
    email: "",
    name: "",
    product: "",
  });
  const [popupOpened, setPopupOpened] = useState(false);

  const popupRef = useRef();
  const formRef = useRef();
  const formSubmittedRef = useRef();

  const togglePopup = () => {
    popupOpened
      ? (popupRef.current.style.display = "none")
      : (popupRef.current.style.display = "flex");
    setPopupOpened(!popupOpened);
  };

  const handleChange = (e) => {
    setNewSignup((prev) => {
      const key = e.target.name;
      const value = e.target.value;
      return { ...prev, [key]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const waitlistInstance = collection(dbLeads, "waitlist");

    const signupRef = await addDoc(waitlistInstance, newSignup);

    formRef.current.style.display = "none";
    formSubmittedRef.current.style.display = "flex";
  };

  return (
    <>
      <Head>
        <title>Publicly - User feedback management tool</title>
        <meta
          name="description"
          content="Stop building products nobody uses thanks to the power of user feedback."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <MainNav openPopup={() => togglePopup()} />

        <div className={styles.container}>
          <section className={styles.hero}>
            <h1 className={styles.header}>
              Stop building products nobody uses
            </h1>
            <p className={styles.subHeader}>
              Get valuable user feedback for your product, so you know which
              features to build next.
            </p>
            <button className="purpleButton" onClick={() => togglePopup()}>
              Join the waitlist
            </button>
            <div className={styles.heroScreenshotWrapper}>
              <div
                className={
                  styles.heroScreenshotGlow + " " + styles.heroScreenshotGlowTop
                }
              ></div>
              <Image
                src={heroScreenshot}
                width={1600}
                height={900}
                className={styles.heroScreenshot}
                alt="Screenshot of the publicly.so app"
              />
              <div
                className={
                  styles.heroScreenshotGlow +
                  " " +
                  styles.heroScreenshotGlowBottom
                }
              ></div>
            </div>
          </section>

          <section className={styles.features}>
            <h2>Make better product decisions</h2>
            <p className={styles.subtitle}>With Publicly, your users can...</p>
            <div className={styles.featuresList}>
              <div className={styles.singleFeatureWrapper}>
                <Image src={messageIcon} width={40} height={40} alt="" />
                <p>Give you feedback on your existing features.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <Image src={lightbulbIcon} width={40} height={40} alt="" />
                <p>Suggest new features they would love to have.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <Image src={likeIcon} width={40} height={40} alt="" />
                <p>Vote for features proposed by other users.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <Image src={bugIcon} width={40} height={40} alt="" />
                <p>Notify you of any bug on your product.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <Image src={planeIcon} width={40} height={40} alt="" />
                <p>See what’s coming next with the product roadmap.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <Image src={calendarIcon} width={40} height={40} alt="" />
                <p>See your changelog.</p>
              </div>
            </div>
            <button className="purpleButton" onClick={() => togglePopup()}>
              Join the waitlist
            </button>
          </section>
        </div>

        <MainFooter />

        <div className={styles.joinPopupWrapper} ref={popupRef}>
          <div className={styles.joinPopup}>
            <div className={styles.initialFormWrapper} ref={formRef}>
              <h2>Join the waitlist of Publicly</h2>
              <form className={styles.joinForm} onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email*"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name*"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="product"
                  placeholder="What's the name of your product?*"
                  onChange={handleChange}
                  required
                />
                <input
                  type="submit"
                  className={styles.submitButton}
                  value="Submit"
                />
              </form>
            </div>
            <div className={styles.formSubmittedWrapper} ref={formSubmittedRef}>
              <Image src={doneIcon} width={80} height={80} alt="" />
              <p className={styles.formSubmittedMessage}>
                Thank you for signing up!
              </p>
            </div>
            <Image
              src={closeButton}
              width={16}
              height={16}
              alt=""
              className={styles.closeButton}
              onClick={() => togglePopup()}
            />
          </div>
        </div>
      </main>
    </>
  );
}
