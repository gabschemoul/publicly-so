import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { LinkHTMLAttributes } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          defer
          data-domain="publicly.so"
          src="https://plausible.io/js/script.js"
        ></Script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
