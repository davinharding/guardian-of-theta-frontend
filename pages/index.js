import React, { useState } from 'react';
import LandingPageBody from "../pages-sections/LandingPage-Sections/LandingPageBody"
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { tvibeTokenAddress } from '../web3/addressConstants';

const dashboardRoutes = [];

const Index = (props) => {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const tvibeBalance = useTokenBalance(tvibeTokenAddress, account); 

  const handleConnectWallet = () => {
    activateBrowserWallet();
  };

  const { ...rest } = props;
  return(
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Theta Vibes"
        rightLinks={
          <HeaderLinks 
            account={account} 
            handleConnectWallet={handleConnectWallet} 
            etherBalance={etherBalance}
            tvibeBalance={tvibeBalance}
            chainId={chainId}
            contractMetadataKey={props.contractMetadataKey}
            page={'index'}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <LandingPageBody />
      <Footer />
    </div>
  )
};

export default Index;
