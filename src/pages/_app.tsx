import type { AppProps } from "next/app";
import Global from "@/styles/global.css";

import '@/styles/base.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Global />
    </>
  );
}
