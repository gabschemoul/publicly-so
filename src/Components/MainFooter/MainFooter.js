import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./MainFooter.module.css";

import publiclyLogo from "../../../public/logos/publiclyLogo.svg";

export default function MainFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href="/">
          <Image
            src={publiclyLogo}
            className={styles.footerLogo}
            alt="Publicly.so logo"
          />
        </Link>

        <div className={styles.footerLinks}>Lien</div>
      </div>
    </footer>
  );
}
