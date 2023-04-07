import "@/styles/globals.css";

import PlausibleProvider from "next-plausible";

import ProductContainer from "../Components/ProductContainer/ProductContainer";

export default function App({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="publicly.so">
      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
