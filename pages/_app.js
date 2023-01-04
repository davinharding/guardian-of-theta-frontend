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
import Script from 'next/script';
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
    365: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
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

    const contractMetadataKey = {
      '0xcd8ee3078fa8565135f1e17974e04a6fbabedd66': {
        url: 'https://cq4btd6fkvsbcjmg6qywqut4tjiov2gvgbgcyfugeiq24gi.arweave.net/FDgZj8VVZBElhvQxaFJ8mlDq6N_-UwT_CwWhiI-hrhk',
        name: "Guardian",
        stakeContract: '0x67fc8c72707f17761ced1e71ee9a92be36179eac'
      },
      '0x1a54ff4a92daf67eafb9a790d596b9794e2d27a8': {
        url: 'https://mvy4bnetjgdfdxj7ay6mzfpewhfoochmsllgxj3yrfs4e4idwu.arweave.net/ZXHAtJNJhlHdPwY8zJXks-crnCOyS1muneIllwnEDtY',
        name: "Fly N High",
        stakeContract: '0x67fc8c72707f17761ced1e71ee9a92be36179eac'
       }, 
       '0xa07965551c88df408594139ac23c778cf54e25f4': {
        url: 'https://hcllyblpadi6hqjsdxdcvm7xvng3otlxoixkwbziilagxotaoy.arweave.net/OJa8BW_8A0ePBMh3GKrP3q023TXdyLqsHKELAa7pgdg',
        name: "Down with Me",
        stakeContract: '0x76d39587003800215059070Dc1e36D5E939DA0aC'
       }, 
       '0x4c7d0a83d59bd47219cd5ca980047d38de07686c': {
        url: 'https://mcfzzovh2ackan55luk5fp3n6zemmoivtwqfjf6oj5uwtppzoe.arweave.net/YIucuqfQBKA3vV0V0r9t9kjGO_RWdoFSXzk9pab35cU',
        name: "Dreamland",
        stakeContract: '0x67fc8c72707f17761ced1e71ee9a92be36179eac'
       }, 
       '0xf20687fc0a0c6e6bb20cfb7334bc2bac20ff57c0': {
        url: 'https://karbabo3vw43es7nijruppndmojjjixquhmyj53xcw5i3pu65m.arweave.net/UCIQBdutub-JL7UJjR72jY5KUovCh2YT3dxW6jb6e60',
        name: "Beam My Line",
        stakeContract: '0x67fc8c72707f17761ced1e71ee9a92be36179eac'
       }, 
      '0x2b1dc7c56d17702a53a8adbc158b073b60dd9be1': {
        url: 'https://oqm2vlnadma7ahuo73lryxqqc5d4dhfdb2dycqw44rsz7tl2.arweave.net/dBmq-raAbAfAejv7XHF4QF0fBnKMOh4F_C3ORln8160',
        name: "Gimme the TFuel",
        stakeContract: '0x67fc8c72707f17761ced1e71ee9a92be36179eac'
      },
      '0x67fc8c72707f17761ced1e71ee9a92be36179eac': {
        url: 'https://cq4btd6fkvsbcjmg6qywqut4tjiov2gvgbgcyfugeiq24gi.arweave.net/FDgZj8VVZBElhvQxaFJ8mlDq6N_-UwT_CwWhiI-hrhk',
        name: 'Staked Guardian',
        stakeContract: '0x67fc8c72707f17761ced1e71ee9a92be36179eac'
      },
      '0x1e9be4b41510cfbe4af40e06829df05bf873d65d': {
        url: 'https://cq4btd6fkvsbcjmg6qywqut4tjiov2gvgbgcyfugeiq24gi.arweave.net/FDgZj8VVZBElhvQxaFJ8mlDq6N_-UwT_CwWhiI-hrhk',
        name: 'Test Guardian',
        stakeContract: '0x67fc8c72707f17761ced1e71ee9a92be36179eac'
      }
    };

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
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-1PPQHTHQ53"/>
        <Script
          id='google-analytics'
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
