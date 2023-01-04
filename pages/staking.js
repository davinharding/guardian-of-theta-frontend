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
import { formatEther } from '@ethersproject/units'
import { useEthers, useEtherBalance, useTokenBalance } from "@usedapp/core";
import axios from 'axios';
import { useReadFunction } from "../web3/useReadFunction";
import { useCalculateRewards } from "../web3/useCalculateRewards";
import { stakeGuardianAddress } from "../web3/StakeGuardianAddresss";

import styles from "styles/jss/nextjs-material-kit/pages/loginPage.js";
import { WithdrawButton } from "../web3/withdrawButton";
import { CircularProgress } from "@material-ui/core";

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

  // DAVIN: PULL OUT ALL CONSTANT VARIABLES INTO THEIR OWN FILE OR FOLDER

  const THETA_VIBES_NFT_ADDRESSES = [
    "0xcd8ee3078fa8565135f1e17974e04a6fbabedd66", // Guardian
    "0x1E9BE4b41510cfBe4af40E06829Df05BF873D65d", // Test Guardian
    "0x1a54ff4a92daf67eafb9a790d596b9794e2d27a8", // Fly N High
    "0xa07965551c88df408594139ac23c778cf54e25f4", // Down with Me
    "0x4c7d0a83d59bd47219cd5ca980047d38de07686c", // Dreamland
    "0xf20687fc0a0c6e6bb20cfb7334bc2bac20ff57c0", // Beam My Line
    "0x2b1dc7c56d17702a53a8adbc158b073b60dd9be1", // gimme the tfuel
  ];

  const STAKED_NFT_ADDRESSES = [
    // '0x036cF009EF2893718b7C9e0Fc885205125af60eC', // Test Guardian
    stakeGuardianAddress
  ]

  const UNSTAKED_NFT_ADDRESSES = [
    '0x1e9be4b41510cfbe4af40e06829df05bf873d65d', // Test Guardian
  ]

  function getStakedNfts(contractAddresses, accountAddress) {
    let returnArr = [];
    contractAddresses.forEach(contractAddress => {
      const currentTokensDeposited = useReadFunction(contractAddress, accountAddress, nftStakingAbi, 'depositsOf');
      if(currentTokensDeposited){
        Object.values(currentTokensDeposited).forEach(tokenId => {
          returnArr.push({ 
            contract: contractAddress,
            token: parseInt(tokenId),
          });
        }); 
      }
         
    });
    return returnArr;
  };
  
  const stakedNfts = getStakedNfts(STAKED_NFT_ADDRESSES, account);

  function createTokenIdArray(nfts) {
    let tokenIdArray = [];
    nfts.forEach(e => {
      tokenIdArray.push(e.token);
    })
    return tokenIdArray;
  }

  const stakedTokenIdArray = createTokenIdArray(stakedNfts);

  // const unstakedTokenIdArray = createTokenIdArray(unstakedNfts);
  
  function calculateUnclaimedRewards() {
    const bigNumberArray = useCalculateRewards(STAKED_NFT_ADDRESSES[0], account, stakedTokenIdArray);

    let answer = 0;
    if(bigNumberArray) {
      bigNumberArray.forEach(e => {
        answer += Number(parseFloat(formatEther(e)).toFixed(3));
      })
    }
    
    return answer;
  }

  // DAVIN: needs to be changed to check all six contract addresses and not just one
  let unclaimedRewards = calculateUnclaimedRewards();

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
                // console.log(response.data, 'test');
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
    if(contractAddresses === THETA_VIBES_NFT_ADDRESSES) {
      setNftData(nfts);
    } else {
      setStakedNftData(nfts);
    }
    
  }

  useEffect(() => {
    if(txnSuccessful) {
      setTimeout(() => {
        getNFTsForContract(THETA_VIBES_NFT_ADDRESSES, account);
        getNFTsForContract(STAKED_NFT_ADDRESSES, account);
      }, 2000)
    } else {
      getNFTsForContract(THETA_VIBES_NFT_ADDRESSES, account);
      getNFTsForContract(STAKED_NFT_ADDRESSES, account);
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
          <GridContainer justifyContent="center">
            <GridItem xs={12} sm={6} md={12}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h4>Staking Menu</h4>
                </CardHeader>
                {nftData.length !== 0 || stakedNftData.length !== 0 ? (
                  <CardBody>
                  <div>
                    TVIBE Balance: {tvibeBalance && 
                    parseFloat(formatEther(tvibeBalance)).toFixed(3)} 
                  </div> 
                  <div>
                    Unclaimned TVIBE Balance: {unclaimedRewards && 
                    parseFloat(unclaimedRewards).toFixed(3)} 
                  </div> 
                    <div style={{marginTop: "3rem"}}>  
                      {chainId === 361 ? nftData.map((e,idx)=>{
                        return(    
                          <span key={idx}>                                  
                            <Card className={classes.stakingCard}>
                              <CardHeader color="primary">
                                {props.imgUrlKey[e.contract].name} #{e.token}
                              </CardHeader>
                              <CardBody>
                                <img src={props.imgUrlKey[e.contract].url} key={idx} height="100%" width="100%"/>
                              </CardBody>
                              <CardFooter>
                                <ContractButton 
                                  contractAddress={e.contract}
                                  abi={nftContractAbi}
                                  functionName={'setApprovalForAll'}
                                  buttonTitle={'Approve'}
                                  sendParameter={stakeGuardianAddress}
                                  sendParameter2={true}
                                  // nftContract={'0x1e9be4b41510cfbe4af40e06829df05bf873d65d'}
                                />
                                <DepositButton 
                                  setTxnSuccessful={setTxnSuccessful}  
                                  tokenId={e.token} 
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
                              {props.imgUrlKey[e.contract].name} #{e.token}
                            </CardHeader>
                            <CardBody>
                              <img src={props.imgUrlKey[e.contract].url} height="100%" width="100%"/>
                            </CardBody>
                            <CardFooter>
                              <WithdrawButton 
                                setTxnSuccessful={setTxnSuccessful} 
                                tokenId={e.token} 
                              />
                            </CardFooter>     
                          </Card>
                        </span>
                      )
                    })}
                    <div style={{marginTop: "3rem"}}>  
                      {/* {stakedNfts.map((e,idx)=>{
                        return(    
                          <span key={idx}>                                  
                          <Card className={classes.stakingCard}>
                            <CardHeader color="primary">
                              {props.imgUrlKey[e.contract].name} #{e.token}
                            </CardHeader>
                            <CardBody>
                              <img key={idx} src={props.imgUrlKey[e.contract].url} height="100%" width="100%"/>
                            </CardBody>
                            <CardFooter>
                              <WithdrawButton 
                                setTxnSuccessful={setTxnSuccessful} 
                                tokenId={e.token} 
                              />
                            </CardFooter>     
                          </Card>  
                          </span>                      
                        )
                      })} */}
                    </div>
                    <div>
                      <span className={classes.stakingButton}>
                        <ContractButton 
                        contractAddress={stakeGuardianAddress}
                        abi={nftStakingAbi}
                        functionName={'claimRewards'}
                        buttonTitle={'Collect All'}
                        sendParameter={stakedTokenIdArray}
                      />
                      </span>
                      <span className={classes.stakingButton}>
                      <ContractButton 
                        contractAddress={stakeGuardianAddress}
                        abi={nftStakingAbi}
                        functionName={'withdraw'}
                        buttonTitle={'Withdraw All'}
                        sendParameter={stakedTokenIdArray}
                      />
                      </span>
                      {/* {unstakedNfts.length >= 0 ? ( */}
                        <span className={classes.stakingButton}>
                          <ContractButton 
                            contractAddress={stakeGuardianAddress}
                            abi={nftStakingAbi}
                            functionName={'deposit'}
                            buttonTitle={'Deposit All'}
                            // sendParameter={unstakedTokenIdArray}
                          />
                        </span>
                      {/* ) : (
                        ''
                      )} */}
                      
                    </div>
                    <ContractButton 
                      contractAddress={'0x036cF009EF2893718b7C9e0Fc885205125af60eC'}
                      abi={nftStakingAbi}
                      functionName={'updateRewardRate'}
                      buttonTitle={'Update rewardRate'}
                    />
                    <ContractButton 
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
                    />
                    {/* <MintButton account={account} /> */}
                  </CardBody>
                  ) : (
                    <div className={classes.progress} >
                      <CircularProgress color="primary" size={100} />
                    </div>                    
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
