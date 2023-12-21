/*!

=========================================================
* NextJS Material Kit v1.2.0 based on Material Kit Free - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-kit/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import Script from "next/script";
import { DAppProvider, Theta, useEthers } from "@usedapp/core";

import PageChange from "components/PageChange/PageChange.js";

import "styles/scss/nextjs-material-kit.scss?v=1.2.0";
import { contractMetadataKey } from "../web3/ContractMetadataKey";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

const config = {
  readOnlyChainId: Theta.chainId,
  readOnlyUrls: {
    [Theta.chainId]: "https://eth-rpc-api.thetatoken.org/rpc",
    365: "https://eth-rpc-api-testnet.thetatoken.org/rpc", // theta testnet
  },
};

export default class MyApp extends App {
  // static async getInitialProps({ Component, router, ctx }) {
  //   let pageProps = {};

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }

  //   return { pageProps };
  // }

  render() {
    const { Component, pageProps } = this.props;

    if (!Component) {
      return null;
    }

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Theta Vibes</title>
        </Head>
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-1PPQHTHQ53"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1PPQHTHQ53', {
              page_path: window.location.pathname,
              });
            `,
          }}
        />
        <DAppProvider config={config}>
          <Component contractMetadataKey={contractMetadataKey} {...pageProps} />
        </DAppProvider>
      </React.Fragment>
    );
  }
}
