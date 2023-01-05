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
import { ContractButton } from "../web3/contractButton";
import { DepositButton } from "../web3/depositButton";
import { nftStakingAbi } from "../web3/nftStakingAbi";
import { nftContractAbi } from "../web3/nftContractAbi";
import { formatEther, parseUnits } from '@ethersproject/units'
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import axios from 'axios';
import { useReadFunction } from "../web3/useReadFunction";
import { useCalculateRewards } from "../web3/useCalculateRewards";
import { stakedNftAddresses } from "../web3/stakedNftAddresses";

import styles from "styles/jss/nextjs-material-kit/pages/loginPage.js";
import { WithdrawButton } from "../web3/withdrawButton";
import { CircularProgress } from "@material-ui/core";
import { useIsApprovedForAll } from "../web3/useIsApprovedForAll";
import { contractMetadataKey } from "../web3/ContractMetadataKey";
import { ApproveDepositSection } from "../web3/ApproveDepositSection";
import { thetaVibesNftAddresses } from "../web3/thetaVibesNftAddresses";
import { UnclaimedRewards } from "../web3/UnclaimedRewards";

const useStyles = makeStyles(styles);

export default function StakingPage(props) {
  const [nftData, setNftData] = useState([]);
  const [stakedNftData, setStakedNftData] = useState([]);
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const [txnSuccessful, setTxnSuccessful] = useState(false);
  const { activateBrowserWallet, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  let tvibeBalance = useTokenBalance('0xfdbf39114ba853d811032d3e528c2b4b7adcecd6', account);

  // testnet tvibe address: 0xefd424dfcc47e74a23175713f3e4c3493877f192

  function getNFTsForContract(contractAddresses, accountAddress) {
    const nfts = [];
    if(chainId === 361 && account) { // Theta Mainnet
      contractAddresses.forEach((address) => {
        axios
          .get(
            `https://www.thetascan.io/api/721/?address=${accountAddress}&contract=${address}`
          )
          .then((response) => {
            // handle success
            if (response.data) {
              response.data.forEach((nE) => {
                // console.log(nE);
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
    }
    if(contractAddresses === thetaVibesNftAddresses) {
      setNftData(nfts);
    } else {
      setStakedNftData(nfts);
    }    
  }

  useEffect(() => {
    if(txnSuccessful) {
      setTimeout(() => {
        getNFTsForContract(thetaVibesNftAddresses, account);
        getNFTsForContract(stakedNftAddresses, account);
      }, 4000)
    } else {
      getNFTsForContract(thetaVibesNftAddresses, account);
      getNFTsForContract(stakedNftAddresses, account);
    }   
    setTxnSuccessful(false);
  }, [account, txnSuccessful]);

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
          tvibeBalance={tvibeBalance}
          chainId={chainId}
          contractMetadataKey={contractMetadataKey}
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
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={6} md={12}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Staking Menu</h4>
                </CardHeader>
                {account && nftData.length !== 0 || account && stakedNftData.length !== 0 ? (
                  <CardBody>
                  <div>
                    TVIBE Balance: {tvibeBalance && 
                    parseFloat(formatEther(tvibeBalance)).toFixed(3)} 
                  </div> 
                  <UnclaimedRewards
                    stakedNftData={stakedNftData}
                  />
                    <div style={{marginTop: "3rem"}}>  
                      {chainId === 361 ? nftData.map((e,idx)=>{
                        return(    
                          <span key={idx}>                                  
                            <Card className={classes.stakingCard}>
                              <CardHeader color="primary">
                                {contractMetadataKey[e.contract].name} #{e.token}
                              </CardHeader>
                              <CardBody>
                                <img src={contractMetadataKey[e.contract].url} key={idx} height="100%" width="100%"/>
                              </CardBody>
                              <CardFooter className={classes.center}>
                                <ApproveDepositSection
                                  contract={e.contract}
                                  abi={nftContractAbi}
                                  functionName={'setApprovalForAll'}
                                  buttonTitle={'Approve'}
                                  sendParameter={contractMetadataKey[e.contract].stakeContract}
                                  sendParameter2={true}
                                  setTxnSuccessful={setTxnSuccessful} 
                                  token={e.token}
                                />                                
                              </CardFooter>     
                            </Card>
                          </span>
                        )
                      }) : ''}
                    </div>
                    
                    {stakedNftData.map((e,idx)=>{
                      return(                      
                        <span key={idx} style={{marginTop: "3rem"}}>       
                          <Card className={classes.stakingCard}>
                            <CardHeader color="primary">
                              {contractMetadataKey[e.contract.toLowerCase()].name} #{e.token}
                            </CardHeader>
                            <CardBody>
                              <img src={contractMetadataKey[e.contract].url} height="100%" width="100%"/>
                            </CardBody>
                            <CardFooter className={classes.center}>
                              <WithdrawButton 
                                setTxnSuccessful={setTxnSuccessful} 
                                tokenId={e.token} 
                                nftAddress={e.contract}
                              />
                            </CardFooter>     
                          </Card>
                        </span>
                      )
                    })}
                    {/* <div>
                      <span className={classes.stakingButton}>
                        <ContractButton 
                        contractAddress={stakedNftAddresses[0]}
                        abi={nftStakingAbi}
                        functionName={'claimRewards'}
                        buttonTitle={'Collect All'}
                        sendParameter={stakedTokenIdArray}
                      />
                      </span>
                      <span className={classes.stakingButton}>
                      <ContractButton 
                        contractAddress={stakedNftAddresses[0]}
                        abi={nftStakingAbi}
                        functionName={'withdraw'}
                        buttonTitle={'Withdraw All'}
                        sendParameter={stakedTokenIdArray}
                      />
                      </span>
                      {unstakedNfts.length >= 0 ? (
                        <span className={classes.stakingButton}>
                          <ContractButton 
                            contractAddress={stakedNftAddresses[0]}
                            abi={nftStakingAbi}
                            functionName={'deposit'}
                            buttonTitle={'Deposit All'}
                            // sendParameter={unstakedTokenIdArray}
                          />
                        </span>
                      ) : (
                        ''
                      )}                      
                    </div> */}
                    {/* <ContractButton 
                      contractAddress={'0x67fc8c72707f17761ced1e71ee9a92be36179eac'}
                      abi={nftStakingAbi}
                      functionName={'withdrawTokens'}
                      buttonTitle={'Withdraw Tokens'}
                      sendParameter={parseUnits("40000000", "ether")}
                    /> */}
                    {/* <ContractButton 
                      contractAddress={'0x036cF009EF2893718b7C9e0Fc885205125af60eC'}
                      abi={nftStakingAbi}
                      functionName={'setERC721Address'}
                      buttonTitle={'Set ERC721 Address'}
                      sendParameter={'0x1e9be4b41510cfbe4af40e06829df05bf873d65d'}
                    />
                    <ContractButton 
                      contractAddress={'0x1e9be4b41510cfbe4af40e06829df05bf873d65d'}
                      abi={nftStakingAbi}
                      functionName={'approve'}
                      buttonTitle={'Set Approval'}
                      sendFunction={(stakeGuardianAddress, true)}
                      // nftContract={'0x1e9be4b41510cfbe4af40e06829df05bf873d65d'}
                    /> */}
                  </CardBody>
                  ) : (
                    !account ? (
                      <div className={classes.progress}>
                        Please connect your account in the top right corner to access the staking page
                      </div>
                    ) : (
                      <div className={classes.progress} >
                        <CircularProgress color="primary" size={100} />
                      </div>    
                    )

                    
                                    
                  )                  
                }                
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
