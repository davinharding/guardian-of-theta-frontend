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
import { DAppProvider, Theta, useEthers } from '@usedapp/core';

import PageChange from "components/PageChange/PageChange.js";

import "styles/scss/nextjs-material-kit.scss?v=1.2.0";

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
    [Theta.chainId]: 'https://eth-rpc-api.thetatoken.org/rpc',
  },
};

export default class MyApp extends App {

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  
  render() {
    const { Component, pageProps } = this.props;

    // function getNFTsForContract(contractAddresses, accountAddress) {
    //   const nfts = [];
    //   contractAddresses.forEach((address) => {
    //     axios
    //       .get(
    //         `https://www.thetascan.io/api/721/?address=${accountAddress}&contract=${address}`
    //       )
    //       .then((response) => {
    //         // handle success
    //         if (response.data) {
    //           response.data.forEach((nE) => {
    //             nfts.push(nE);
    //           });
    //         }
    //       })
    //       .catch((error) => {
    //         // handle error
    //         setNftData([]);
    //         // eslint-disable-next-line no-console
    //         console.error(error);
    //       });
    //   });
    //   setNftData(nfts);
    // }

    // useEffect(() => {
    //   if (account) {
    //     getNFTsForContract(BARRIZAN_NFT_ADDRESSES, account);
    //   } else {
    //     setShowStoreButton(false); // Removes the store link from view if user disconnects and account is undefined
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [account]);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Theta Vibes</title>
        </Head>
        <DAppProvider config={config}>
          <Component {...pageProps} /> 
        </DAppProvider>        
      </React.Fragment>
    );
  }
}
