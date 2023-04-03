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

        <div className={styles.footerLinks}>
          <Link
            href="https://gabschemoul.notion.site/Docs-165fe4cfe65e47ff83041e7b4d8d383b"
            target="_blank"
          >
            Help center
          </Link>
          <Link
            href="https://gabschemoul.notion.site/Terms-and-Conditions-09b6dee1bab7489398ec51471dcaa561"
            target="_blank"
          >
            Terms & Conditions
          </Link>
          <Link
            href="https://www.privacyboard.co/company/publicly?tab=privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
