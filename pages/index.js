import { React } from "react";
import LandingPageBody from "../pages-sections/LandingPage-Sections/LandingPageBody";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { tvibeTokenAddress } from "../web3/addressConstants";

const dashboardRoutes = [];

const Index = (props) => {
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  let tvibeBalance = useTokenBalance(tvibeTokenAddress, account);

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
            contractMetadataKey={props.contractMetadataKey}
            account={account}
            handleConnectWallet={handleConnectWallet}
            etherBalance={etherBalance}
            tvibeBalance={tvibeBalance}
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
};

export default Index;
