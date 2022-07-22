import { React, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import { useEthers, useEtherBalance } from "@usedapp/core";
import axios from 'axios';

import styles from "styles/jss/nextjs-material-kit/pages/loginPage.js";

const useStyles = makeStyles(styles);

export default function StakingPage(props) {
  const [nftData, setNftData] = useState([]);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  const THETA_VIBES_NFT_ADDRESSES = [
    "0xcd8ee3078fa8565135f1e17974e04a6fbabedd66", // Guardian
    "0x1a54ff4a92daf67eafb9a790d596b9794e2d27a8", // Fly N High
    "0xa07965551c88df408594139ac23c778cf54e25f4", // Down with Me
    "0x4c7d0a83d59bd47219cd5ca980047d38de07686c", // Dreamland
    "0xf20687fc0a0c6e6bb20cfb7334bc2bac20ff57c0", // Beam My Line
    "0x2b1dc7c56d17702a53a8adbc158b073b60dd9be1", // gimme the tfuel
  ];

  function getNFTsForContract(contractAddresses, accountAddress) {
    const nfts = [];
    contractAddresses.forEach((address) => {
      axios
        .get(
          `https://www.thetascan.io/api/721/?address=${accountAddress}&contract=${address}`
        )
        .then((response) => {
          // handle success
          if (response.data) {
            response.data.forEach((nE) => {
              nfts.push(nE);
            });
          }
        })
        .catch((error) => {
          // handle error
          setNftData([]);
          // eslint-disable-next-line no-console
          console.error(error);
        });
    });
    setNftData(nfts);
  }

  useEffect(() => {
    if (account) {
      getNFTsForContract(THETA_VIBES_NFT_ADDRESSES, account);
    }
  }, [account]);

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
        brand="NextJS Material Kit"
        rightLinks={
          <HeaderLinks
          account={account} 
          handleConnectWallet={handleConnectWallet} 
          etherBalance={etherBalance}
          chainId={chainId}
          imgUrlKey={props.imgUrlKey}
          />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/thetavibes-neon.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Staking Menu</h4>
                  </CardHeader>
                  <CardBody>
                    {nftData.map(e=>{
                      return(
                        <div style={{textAlign: "center", marginTop: "3rem"}}>                
                          <Card>
                            <CardHeader color="primary">
                              {props.imgUrlKey[e.contract].name} #{e.token}
                            </CardHeader>
                            <CardBody>
                              <img src={props.imgUrlKey[e.contract].url} height="100%" width="100%"/>
                            </CardBody>
                            <CardFooter>
                              <Button color="primary">
                                Stake
                              </Button> 
                              <Button color="primary">
                                Collect
                              </Button> 
                            </CardFooter>     
                          </Card>
                        </div>
                      )
                    })}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    {/* <Button simple color="primary" size="lg">
                      Get started
                    </Button> */}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
