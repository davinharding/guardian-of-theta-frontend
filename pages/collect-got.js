import { React, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import { formatEther } from '@ethersproject/units';
import commaNumber from "comma-number";
import styles from "styles/jss/nextjs-material-kit/pages/stakingPage.js";
import { contractMetadataKey } from "../web3/ContractMetadataKey";
import { tvibeTokenAddress } from "../web3/addressConstants";
import { GOTDistributorAbi } from "../web3/GOTDistributorAbi";
import { GOTTokenAddress, GOTDistributorAddress } from "../web3/addressConstants";
import dynamic from 'next/dynamic';
import { Theta } from '@usedapp/core';


const useStyles = makeStyles(styles);

const GOTCollectButton = dynamic(
  import('../web3/GOTCollectButton').then((lib) => lib.default),
  { ssr: false }
);

export default function CollectGOTPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  let tvibeBalance = useTokenBalance(tvibeTokenAddress, account);
  let GOTbalance = useTokenBalance(GOTTokenAddress, account);

  const handleConnectWallet = () => {
    activateBrowserWallet();
  };
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  const { ...rest } = props;

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="ThetaVibes"
        rightLinks={
          <HeaderLinks
            account={account}
            handleConnectWallet={handleConnectWallet}
            etherBalance={etherBalance}
            tvibeBalance={tvibeBalance}
            chainId={chainId}
            contractMetadataKey={contractMetadataKey}
          />
        }
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/thetavibes-neon_smaller.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={6} md={12}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>$GOT Collection Menu</h4>
                </CardHeader>
                <CardBody>
                  {account && (chainId === Theta.chainId) ? (
                    <div className={classes.header}>
                      GOT Balance: {GOTbalance && 
              commaNumber(parseFloat(formatEther(GOTbalance)).toFixed(7))}
                      <GOTCollectButton
                        contractAddress={GOTDistributorAddress}
                        abi={GOTDistributorAbi}
                        functionName={'claimReward'}
                        buttonTitle={'Claim $GOT'}
                        gasLimit={100000}
                        userAddress={account}
                      />
                    </div>
                  ) : (
                    <div className={classes.progress}>
                      Please connect your theta wallet in the top right corner!
                    </div>
                  )}
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  {/* <Button simple color="primary" size="lg">
                    Get started
                  </Button> */}
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
