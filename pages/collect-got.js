import { React, useState, useEffect } from "react";
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

import styles from "styles/jss/nextjs-material-kit/pages/stakingPage.js";
import { contractMetadataKey } from "../web3/ContractMetadataKey";
import { rewardTokenAddress } from "../web3/rewardTokenAddress";
import { ContractButton } from "../web3/contractButton";
import { GOTDistributorAbi } from "../web3/GOTDistributorAbi";
import axios from 'axios';
import { keccak256, bufferToHex, toBuffer } from 'ethereumjs-util';
import { MerkleTree } from 'merkletreejs';
import { ethers, web3 } from "ethers";

const useStyles = makeStyles(styles);

const GOTDistributorAddress = "0x67fc8c72707f17761ced1e71ee9a92be36179eac"

export default function CollectGOTPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [merkleProof, setMerkleProof] = useState([]);
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  let tvibeBalance = useTokenBalance(rewardTokenAddress, account); 

  const handleConnectWallet = () => {
    activateBrowserWallet();
  };
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

  const { ...rest } = props;

  async function getStakeByAddress(address) {
    const response = await axios.get(`https://explorer.thetatoken.org:8443/api/stake/${address}`);
    // console.log('response.data.body', response.data.body)
    return response.data;
  }
  
  async function getStakedAddresses(nodeAddress) {
    const stakeData = await getStakeByAddress(nodeAddress);
    const stakedAddresses = stakeData.body.holderRecords.map(record => record.source);
    stakedAddresses.push('0x94538853Fd519B99964369fe84e6475d705A4454');
    stakedAddresses.push('0xA2D87d7E21F0f79222DB1b438e87220247A450f6');
    // console.log('stakedAddresses', stakedAddresses);
    return stakedAddresses;
  }
  
  function createMerkleTree(addresses) {
    const leaves = addresses.map(address => keccak256(toBuffer(address)));
    const tree = new MerkleTree(leaves, keccak256, { sort: true });
    return tree;
  }

  useEffect( async () => {
    const nodeAddress = '0x104f8b65bf3fa313cc2998b2ab7319f9eca57089'; // guardian node address
    const addresses = await getStakedAddresses(nodeAddress);
    const merkleTree = createMerkleTree(addresses);
    const leaf = keccak256(toBuffer(account));
    const proof = merkleTree.getHexProof(leaf);
    // const bytes32Proof = proof.map(value => ethers.utils.formatBytes32String(value));
    setMerkleProof(proof);
}, [account]);

    console.log(Object.keys(
        merkleProof
      ).map((key) => merkleProof[key]))

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
          />}
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
                  <div className={classes.header}>
                    <ContractButton
                        contractAddress={GOTDistributorAddress}
                        abi={GOTDistributorAbi}
                        functionName={'claimReward'}
                        buttonTitle={'Claim $GOT'}
                        sendParameter={merkleProof} 
                    />
                    <ContractButton
                        contractAddress={GOTDistributorAddress}
                        abi={GOTDistributorAbi}
                        functionName={'updateDistributionRate'}
                        buttonTitle={'Update Distribution Rate'}
                        sendParameter={10} 
                    />
                  </div>                  
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
