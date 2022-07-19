import React from "react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

const dashboardRoutes = [];

export default function Base(props) {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  const handleConnectWallet = () => {
    activateBrowserWallet();
  };

  const { ...rest } = props;
  return (
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
            chainId={chainId}
          />
        }
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      {props.bodyComponent}
      <Footer />
    </div>
  );
}
