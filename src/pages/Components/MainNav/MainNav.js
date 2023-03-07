import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./MainNav.module.css";

import publiclyLogo from "../../../../public/logos/publicly-icon.svg";

export default function MainNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/">
            <Image src={publiclyLogo} />
          </Link>
          <Link className={styles.navLink} href="/pricing">
            Features
          </Link>
          <Link className={styles.navLink} href="/pricing">
            Pricing
          </Link>
          <Link className={styles.navLink} href="/pricing">
            Help Center
          </Link>
        </div>
        <div className={styles.right}>
          <button className="smallPurpleButton">Join the waitlist</button>
        </div>
      </div>
    </nav>
  );
}
