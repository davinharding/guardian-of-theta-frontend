import React, { useState } from 'react';
import LandingPageBody from "../pages-sections/LandingPage-Sections/LandingPageBody"
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

const dashboardRoutes = [];

const Index = (props) => {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const tvibeBalance = useTokenBalance('0xfdbf39114ba853d811032d3e528c2b4b7adcecd6', account); // DAVIN: REPLACE ADDRESS WITH EXTRAPOLATED CONSTANT VALUE

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
