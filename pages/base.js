import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useEthers, useEtherBalance } from "@usedapp/core";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "styles/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import LandingPageBody from "../pages-sections/LandingPage-Sections/LandingPageBody"

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

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
      <LandingPageBody />
      <Footer />
    </div>
  );
}
