import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import MainNav from "./Components/MainNav/MainNav";

import heroScreenshot from "../../public/Screenshots/homeHeroScreenshot.png";
import bugIcon from "../../public/Icons/bugIcon.svg";
import messageIcon from "../../public/Icons/messageIcon.svg";
import lightbulbIcon from "../../public/Icons/lightbulbIcon.svg";

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

import { dbLeads, db } from "@/firebase/config";

export default function Home() {
  const [newSignup, setNewSignup] = useState({
    email: "",
    name: "",
    product: "",
  });

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
        <MainNav />

        <div className={styles.container}>
          <section className={styles.hero}>
            <h1 className={styles.header}>
              Stop building products nobody uses
            </h1>
            <p className={styles.subHeader}>
              Get valuable user feedback for your product, so you know which
              features to build next.
            </p>
            <button className="purpleButton">Join the waitlist</button>
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
                <Image src={messageIcon} width={40} height={40} />
                <p>Give you feedback on your existing features.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <Image src={lightbulbIcon} width={40} height={40} />
                <p>Suggest new features they would love to have.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <p>Vote for features proposed by other users.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <Image src={bugIcon} width={40} height={40} />
                <p>Notify you of any bug on your product.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <p>See what’s coming next with the product roadmap.</p>
              </div>
              <div className={styles.singleFeatureWrapper}>
                <p>See your changelog.</p>
              </div>
            </div>
          </section>
        </div>

        <div className={styles.joinPopupWrapper}>
          <div className={styles.joinPopup}>
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
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
