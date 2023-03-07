import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./MadeWithPublicly.module.css";

import publiclyLogo from "../../../../public/logos/publicly-icon.svg";

export default function MadeWithPublicly() {
  return (
    <div className={styles.container}>
      <Link href="https://publicly.so" target="_blank" className={styles.link}>
        <Image src={publiclyLogo} alt="Publicly icon" width={16} height={16} />
        <p>Made with Publicly</p>
      </Link>
    </div>
  );
}
