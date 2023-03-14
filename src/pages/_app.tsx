import { Fragment, useEffect } from "react";

import type { AppProps } from "next/app";
import Global from "@/styles/global.css";
import { Page } from "@/types/page";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import "@/styles/base.css";

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? Fragment;

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Layout>
      {getLayout(<Component {...pageProps} />)}
      <Global />
    </Layout>
  );
}
